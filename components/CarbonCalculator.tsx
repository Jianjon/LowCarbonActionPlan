
import React, { useState, useMemo } from 'react';
import { calculatorActions, calculatorCategories } from '../data/calculatorConstants';
import SourceInfo from './SourceInfo';
import type { CalculatorAction } from '../types';

const CarbonCalculator: React.FC = () => {
  const [selectedActionId, setSelectedActionId] = useState<string>(calculatorActions[0].id);
  const [inputValue, setInputValue] = useState<string>('');

  const selectedAction = useMemo(
    () => calculatorActions.find(a => a.id === selectedActionId)!,
    [selectedActionId]
  );

  const calculateReduction = (action: CalculatorAction, value: number): number => {
    if (isNaN(value) || value < 0) return 0;

    switch (action.formula) {
      case 'solar_hot_water':
        const equivalentOil = value * action.conversion!;
        return equivalentOil * action.factor;
      case 'simple':
      default:
        return value * action.factor;
    }
  };

  const result = useMemo(() => {
    const value = parseFloat(inputValue);
    return calculateReduction(selectedAction, value);
  }, [inputValue, selectedAction]);

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="action-select" className="block text-sm font-medium text-gray-700 mb-1">
          選擇行動項目
        </label>
        <select
          id="action-select"
          value={selectedActionId}
          onChange={(e) => {
            setSelectedActionId(e.target.value);
            setInputValue(''); // Reset input when action changes
          }}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm rounded-md"
        >
          {Object.entries(calculatorCategories).map(([category, label]) => (
            <optgroup label={label} key={category}>
              {calculatorActions
                .filter(action => action.category === category)
                .map(action => (
                  <option key={action.id} value={action.id}>{action.label}</option>
                ))}
            </optgroup>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="action-value" className="block text-sm font-medium text-gray-700 mb-1">
          輸入數量 (請注意單位)
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <input
            type="number"
            id="action-value"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="focus:ring-brand-primary focus:border-brand-primary block w-full pl-4 pr-16 sm:text-sm border-gray-300 rounded-md"
            placeholder="請輸入數字"
            min="0"
          />
          <div className="absolute inset-y-0 right-0 flex items-center">
            <span className="text-gray-500 sm:text-sm px-4">
              {selectedAction.unit}
            </span>
          </div>
        </div>
      </div>
      
      <div className="pt-4">
        <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 text-center">
          <p className="text-sm text-teal-700">預估每年可減少的碳排放量</p>
          <p className="text-3xl font-bold text-brand-primary mt-1">
            {result.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </p>
          <p className="text-lg text-brand-primary">公斤 (kg CO₂e)</p>
          <div className="mt-2 flex items-center justify-center text-xs text-gray-500">
             <span>計算因子來源：</span>
             <SourceInfo text={selectedAction.factorSource} />
             {selectedAction.conversionSource && (
                <>
                <span className="mx-1">&</span>
                <SourceInfo text={selectedAction.conversionSource} />
                </>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarbonCalculator;
