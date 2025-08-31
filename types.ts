export interface BenefitDetail {
  quantitative: string;
  qualitative: string;
}

export interface FuturePlan {
  continuation: string;
  resourceIntegration: string;
}

export interface LowCarbonPlan {
  projectName: string;
  transformationAspects: string[];
  actionItem: string;
  scopeAndContent: string;
  transformationGoals: string;
  directBenefits: BenefitDetail;
  indirectBenefitsEconomic: BenefitDetail;
  indirectBenefitsEnvironmental: BenefitDetail;
  maintenancePlan: string;
  promotionPlan: string;
  futurePlan: FuturePlan;
}

// FIX: Add missing ExplanationData type definition.
export interface ExplanationData {
  title: string;
  content: {
    title: string;
    details: string;
  }[];
}

// New types for Calculator
export type CalculationFormula = 'simple' | 'solar_hot_water';
export type CalculationPeriod = 'one-time' | 'annual' | 'long-term';
export type ActionType = 'reduction' | 'sequestration';


export interface CalculatorAction {
  id: string;
  label: string;
  unit: string;
  category: string;
  formula: CalculationFormula;
  factor: number;
  factorSource: string;
  icon: string;
  explanation: string;
  calculationPeriod: CalculationPeriod;
  actionType: ActionType;
  // For multi-step formulas
  conversion?: number;
  conversionUnit?: string;
  conversionSource?: string;
}

export interface PlanItem extends CalculatorAction {
  value: number;
  reduction: number;
}