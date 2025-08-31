
import { GoogleGenAI, Type } from "@google/genai";
import type { LowCarbonPlan } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const benefitDetailSchema = {
    type: Type.OBJECT,
    properties: {
        quantitative: { type: Type.STRING, description: "可量化的效益，請提供具體數據。例如：每年減少碳排放約 500 公斤。" },
        qualitative: { type: Type.STRING, description: "質化的效益，描述改善的狀況。例如：提升社區居民的環保意識。" },
    },
    required: ["quantitative", "qualitative"],
};

const planSchema = {
  type: Type.OBJECT,
  properties: {
    projectName: { type: Type.STRING, description: "根據用戶輸入，生成一個響亮且貼切的專案名稱。" },
    transformationAspects: {
      type: Type.ARRAY,
      description: "改造面向（可複選）。請從「生態綠化、資源循環、綠能節電、低碳生活、綠色運輸、永續經營」中選擇最符合的項目。",
      items: { type: Type.STRING },
    },
    actionItem: { type: Type.STRING, description: "具體的行動項目名稱。例如：建置食農教育菜園、推動資源回收與廚餘堆肥、汰換社區公共照明為節能燈具等。" },
    scopeAndContent: { type: Type.STRING, description: "詳細說明執行範疇與內容簡述，條列式說明施作方式、地點、規模等。" },
    transformationGoals: { type: Type.STRING, description: "明確說明本次改造希望達成的量化與質化目標。" },
    directBenefits: { ...benefitDetailSchema, description: "可立即觀察、量測或換算的直接效益。" },
    indirectBenefitsEconomic: { ...benefitDetailSchema, description: "因本案產生的潛在經濟效益，如節省水電費、維修成本或增加收益等。" },
    indirectBenefitsEnvironmental: { ...benefitDetailSchema, description: "因本案產生的潛在環境效益，如帶動居民環保行為改變、提升生態友善意識等。" },
    maintenancePlan: { type: Type.STRING, description: "擬定完工後的維護管理方法，可包含由誰維護、維護頻率與方式。例如：由社區志工隊每月定期巡檢與維護。" },
    promotionPlan: { type: Type.STRING, description: "規劃宣導與展示計畫，以增加計畫的可見度與教育效果。例如：設立解說牌、辦理成果觀摩會。" },
    futurePlan: {
      type: Type.OBJECT,
      description: "規劃未來三年的延續性與資源整合。",
      properties: {
        continuation: { type: Type.STRING, description: "計畫延續：說明未來三年是否會持續推動，或擴充至其他場域。" },
        resourceIntegration: { type: Type.STRING, description: "資源整合：說明未來執行所需的人力、經費、協力單位，並列出可能整合的在地資源。" },
      },
      required: ["continuation", "resourceIntegration"],
    },
  },
  required: [
    "projectName",
    "transformationAspects",
    "actionItem",
    "scopeAndContent",
    "transformationGoals",
    "directBenefits",
    "indirectBenefitsEconomic",
    "indirectBenefitsEnvironmental",
    "maintenancePlan",
    "promotionPlan",
    "futurePlan",
  ],
};


export const generatePlan = async (userInput: string): Promise<LowCarbonPlan> => {
  const prompt = `請根據以下用戶想改造的內容，參考新竹縣的「改造專案填報表」和「預期效益與未來規畫表」的結構，生成一份低碳行動改造計畫書。請確保計畫內容具體、務實，適合小型社區或家戶執行。\n\n用戶輸入："${userInput}"`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "你是一位專門協助社區與民眾規劃低碳永續行動的顧問。你的任務是根據用戶的想法，生成一份符合官方申請文件「表1_改造專案填報表」與「表2_預期效益與未來規畫」格式的改造計畫書草案。請嚴格遵循提供的 JSON schema 格式輸出。",
        responseMimeType: "application/json",
        responseSchema: planSchema,
      },
    });

    const jsonText = response.text.trim();
    const parsedPlan = JSON.parse(jsonText) as LowCarbonPlan;
    return parsedPlan;
  } catch (error) {
    console.error("Error generating plan with Gemini API:", error);
    throw new Error("Failed to generate plan from API.");
  }
};
