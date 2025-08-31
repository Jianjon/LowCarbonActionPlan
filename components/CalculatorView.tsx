import React, { useState, useMemo, useCallback } from 'react';
import ActionSelector from './ActionSelector';
import CalculationPanel from './CalculationPanel';
import type { CalculatorAction, PlanItem } from '../types';
import TotalReductionInfo from './TotalReductionInfo';

const CalculatorView: React.FC = () => {
  const [selectedAction, setSelectedAction] = useState<CalculatorAction | null>(null);
  const [planItems, setPlanItems] = useState<PlanItem[]>([]);

  const calculateReduction = useCallback((action: CalculatorAction, value: number): number => {
    if (isNaN(value) || value < 0) return 0;

    switch (action.formula) {
      case 'solar_hot_water':
        const equivalentOil = value * action.conversion!;
        return equivalentOil * action.factor;
      case 'simple':
      default:
        return value * action.factor;
    }
  }, []);

  const handleAddItem = (action: CalculatorAction, value: number) => {
    const reduction = calculateReduction(action, value);
    const newItem: PlanItem = {
      ...action,
      value,
      reduction,
    };
    setPlanItems(prevItems => [...prevItems, newItem]);
  };

  const handleRemoveItem = (itemId: string, index: number) => {
    setPlanItems(prevItems => prevItems.filter((_, i) => i !== index));
  };
  
  const totalReduction = useMemo(() => {
    return planItems.reduce((sum, item) => sum + item.reduction, 0);
  }, [planItems]);

  return (
    <div className="mt-6">
       <div>
        <h2 className="text-2xl font-bold text-brand-text-primary">減碳效益計算器</h2>
        <p className="mt-2 text-brand-text-secondary">
          從左側選擇一個行動項目，了解其減碳原理，並在右側將其加入您的減碳計畫中以估算總效益。
        </p>
      </div>
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ActionSelector onActionSelect={setSelectedAction} selectedActionId={selectedAction?.id} />
        <CalculationPanel
          selectedAction={selectedAction}
          onAddItem={handleAddItem}
          onRemoveItem={handleRemoveItem}
          planItems={planItems}
        />
      </div>
      <div className="mt-8">
        <TotalReductionInfo totalReduction={totalReduction} />
      </div>
    </div>
  );
};

export default CalculatorView;