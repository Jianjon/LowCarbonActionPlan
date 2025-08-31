
import React, { useCallback, useState, useEffect } from 'react';
import type { LowCarbonPlan, BenefitDetail } from '../types';
import SectionCard from './SectionCard';
import ClipboardIcon from './icons/ClipboardIcon';
import LightbulbIcon from './icons/LightbulbIcon';

interface OutputPanelProps {
  plan: LowCarbonPlan | null;
  isLoading: boolean;
  error: string | null;
}

const LoadingSkeleton: React.FC = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-8 bg-gray-200 rounded-md w-1/3"></div>
    <div className="h-20 bg-gray-200 rounded-md w-full"></div>
    <div className="h-8 bg-gray-200 rounded-md w-1/4"></div>
    <div className="h-20 bg-gray-200 rounded-md w-full"></div>
    <div className="h-8 bg-gray-200 rounded-md w-1/3"></div>
    <div className="h-20 bg-gray-200 rounded-md w-full"></div>
  </div>
);

const InitialState: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-white rounded-lg border-2 border-dashed border-brand-secondary">
        <LightbulbIcon className="w-16 h-16 text-brand-primary opacity-50 mb-4" />
        <h3 className="text-lg font-semibold text-brand-primary">您的計畫書將顯示於此</h3>
        <p className="text-brand-text-secondary mt-2">請在左側描述您的改造構想，或參考「靈感角落」尋找點子，然後點擊生成按鈕！</p>
    </div>
);


const OutputPanel: React.FC<OutputPanelProps> = ({ plan, isLoading, error }) => {
  const [copySuccess, setCopySuccess] = useState('');

  const copyToClipboard = useCallback(() => {
    if (!plan) return;

    const benefitDetailToString = (b: BenefitDetail) => `
    - 量化: ${b.quantitative}
    - 質化: ${b.qualitative}`;

    const textToCopy = `
專案名稱: ${plan.projectName}
=========================

## 改造面向
- ${plan.transformationAspects.join('\n- ')}

## 行動項目
${plan.actionItem}

## 執行範疇與內容簡述
${plan.scopeAndContent}

## 改造目標
${plan.transformationGoals}

## 預期效益
### 直接效益
${benefitDetailToString(plan.directBenefits)}

### 間接效益 (經濟面)
${benefitDetailToString(plan.indirectBenefitsEconomic)}

### 間接效益 (環境面)
${benefitDetailToString(plan.indirectBenefitsEnvironmental)}

## 擬定維護管理方法
${plan.maintenancePlan}

## 規劃宣導與展示計畫
${plan.promotionPlan}

## 未來三年的規劃
### 計畫延續
${plan.futurePlan.continuation}
### 資源整合
${plan.futurePlan.resourceIntegration}
`;
    navigator.clipboard.writeText(textToCopy.trim()).then(() => {
        setCopySuccess('已成功複製！');
        setTimeout(() => setCopySuccess(''), 2000);
    }, () => {
        setCopySuccess('複製失敗！');
        setTimeout(() => setCopySuccess(''), 2000);
    });
  }, [plan]);

  useEffect(() => {
    // Reset copy success message when plan changes
    setCopySuccess('');
  }, [plan]);
  
  const renderBenefit = (title: string, benefit: BenefitDetail) => (
    <div className="mt-4 first:mt-0">
        <h4 className="font-semibold text-brand-primary mb-2">{title}</h4>
        <p><strong className="font-medium">量化：</strong> {benefit.quantitative}</p>
        <p><strong className="font-medium">質化：</strong> {benefit.qualitative}</p>
    </div>
  );

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSkeleton />;
    }
    if (error) {
      return (
        <div className="flex items-center justify-center h-full text-center p-8 bg-red-50 border-2 border-dashed border-red-200 rounded-lg">
            <div className="text-red-600">
                <h3 className="font-semibold">發生錯誤</h3>
                <p>{error}</p>
            </div>
        </div>
      );
    }
    if (plan) {
      return (
          <div className="space-y-6">
            <div className="flex justify-between items-start">
                <h2 className="text-xl font-semibold text-brand-text-primary">2. AI 生成的計畫書草案</h2>
                <button
                    onClick={copyToClipboard}
                    className="relative flex items-center px-3 py-2 bg-gray-100 text-brand-text-secondary text-sm rounded-md hover:bg-gray-200 transition-colors"
                >
                    <ClipboardIcon className="w-4 h-4 mr-2" />
                    複製全文
                    {copySuccess && (
                    <span className="absolute -top-7 right-0 text-xs bg-gray-800 text-white px-2 py-1 rounded">
                        {copySuccess}
                    </span>
                    )}
                </button>
            </div>
             <SectionCard title="專案名稱">
                <p className="text-brand-text-primary text-lg font-bold">{plan.projectName}</p>
            </SectionCard>
            <SectionCard title="計畫分類">
                <div>
                    <h4 className="text-sm font-semibold text-brand-text-secondary mb-2">改造面向</h4>
                    <div className="flex flex-wrap gap-2">
                        {plan.transformationAspects.map(aspect => (
                            <span key={aspect} className="px-3 py-1 bg-teal-100 text-teal-800 text-sm font-medium rounded-full">{aspect}</span>
                        ))}
                    </div>
                </div>
                <div className="mt-4">
                    <h4 className="text-sm font-semibold text-brand-text-secondary">行動項目</h4>
                    <p className="text-brand-text-primary">{plan.actionItem}</p>
                </div>
            </SectionCard>
            <SectionCard title="執行範疇與內容簡述" content={plan.scopeAndContent} />
            <SectionCard title="改造目標" content={plan.transformationGoals} />
            <SectionCard title="預期效益">
                {renderBenefit("直接效益", plan.directBenefits)}
                {renderBenefit("間接效益：經濟面", plan.indirectBenefitsEconomic)}
                {renderBenefit("間接效益：環境面", plan.indirectBenefitsEnvironmental)}
            </SectionCard>
            <SectionCard title="擬定維護管理方法" content={plan.maintenancePlan} />
            <SectionCard title="規劃宣導與展示計畫" content={plan.promotionPlan} />
            <SectionCard title="未來三年的規劃">
                <div>
                    <h4 className="font-semibold text-brand-primary mb-2">計畫延續</h4>
                    <p className="text-brand-text-primary whitespace-pre-wrap">{plan.futurePlan.continuation}</p>
                </div>
                <div className="mt-4">
                    <h4 className="font-semibold text-brand-primary mb-2">資源整合</h4>
                    <p className="text-brand-text-primary whitespace-pre-wrap">{plan.futurePlan.resourceIntegration}</p>
                </div>
            </SectionCard>
          </div>
      );
    }
    return <InitialState />;
  };

  return (
    <div className="bg-gray-50/80 backdrop-blur-sm p-6 rounded-lg min-h-[500px] lg:h-full overflow-y-auto">
      {renderContent()}
    </div>
  );
};

export default OutputPanel;