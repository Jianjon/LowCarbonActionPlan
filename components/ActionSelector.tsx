import React from 'react';
import { calculatorActions, calculatorCategories } from '../data/calculatorConstants';
import type { CalculatorAction } from '../types';
import { iconsMap } from './icons';

interface ActionSelectorProps {
  onActionSelect: (action: CalculatorAction) => void;
  selectedActionId?: string;
}

const ActionSelector: React.FC<ActionSelectorProps> = ({ onActionSelect, selectedActionId }) => {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm h-full max-h-[70vh] overflow-y-auto">
      <h3 className="text-xl font-bold text-brand-primary mb-4 sticky top-0 bg-white py-2">1. 選擇行動項目</h3>
      <div className="space-y-4">
        {Object.entries(calculatorCategories).map(([category, label]) => (
          <div key={category}>
            <h4 className="font-semibold text-brand-text-secondary mb-2">{label}</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {calculatorActions
                .filter(action => action.category === category)
                .map(action => {
                  const IconComponent = iconsMap[action.icon];
                  const isSelected = selectedActionId === action.id;
                  return (
                    <button
                      key={action.id}
                      onClick={() => onActionSelect(action)}
                      className={`
                        p-3 rounded-lg border-2 text-center transition-all duration-200
                        flex flex-col items-center justify-center space-y-2 h-full
                        ${isSelected 
                          ? 'bg-teal-50 border-brand-primary shadow-lg scale-105' 
                          : 'bg-gray-50 border-gray-200 hover:border-teal-400 hover:bg-teal-50'}
                      `}
                    >
                      {IconComponent && <IconComponent className={`w-8 h-8 ${isSelected ? 'text-brand-primary' : 'text-gray-500'}`} />}
                      <span className={`font-medium text-sm ${isSelected ? 'text-brand-primary' : 'text-brand-text-primary'}`}>{action.label}</span>
                    </button>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActionSelector;