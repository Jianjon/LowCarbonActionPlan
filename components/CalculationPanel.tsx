import React, { useState, useEffect } from 'react';
import type { CalculatorAction, PlanItem, CalculationPeriod, ActionType } from '../types';
import SourceInfo from './SourceInfo';
import LightbulbIcon from './icons/LightbulbIcon';
import TrashIcon from './icons/TrashIcon';
import { iconsMap } from './icons';

interface CalculationPanelProps {
  selectedAction: CalculatorAction | null;
  planItems: PlanItem[];
  onAddItem: (action: CalculatorAction, value: number) => void;
  onRemoveItem: (itemId: string, index: number) => void;
}

const periodLabels: Record<CalculationPeriod, string> = {
  'one-time': '一次性工程',
  'annual': '足跡減量 (每年)',
  'long-term': '長期效益 (年均)',
};

const periodColors: Record<CalculationPeriod, string> = {
  'one-time': 'bg-blue-100 text-blue-800',
  'annual': 'bg-green-100 text-green-800',
  'long-term': 'bg-purple-100 text-purple-800',
};

const actionTypeLabels: Record<ActionType, string> = {
  'reduction': '⚡️ 減量',
  'sequestration': '🌍 固碳',
};

const actionTypeColors: Record<ActionType, string> = {
  'reduction': 'bg-yellow-100 text-yellow-800',
  'sequestration': 'bg-lime-100 text-lime-800',
};


const CalculationPanel: React.FC<CalculationPanelProps> = ({
  selectedAction,
  planItems,
  onAddItem,
  onRemoveItem
}) => {
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    setInputValue('');
  }, [selectedAction]);

  const handleAdd = () => {
    if (selectedAction && inputValue) {
      const value = parseFloat(inputValue);
      if (value > 0) {
        onAddItem(selectedAction, value);
        setInputValue('');
      }
    }
  };

  return (
    <div className="bg-gray-50/80 p-4 rounded-lg border border-gray-200 shadow-sm h-full flex flex-col max-h-[70vh]">
      <div className="flex-grow flex flex-col min-h-0">
        <h3 className="text-xl font-bold text-brand-primary mb-4 flex-shrink-0">2. 加入您的減碳計畫</h3>
        
        {!selectedAction ? (
          <div className="flex flex-col items-center justify-center text-center p-4 bg-white rounded-lg border-2 border-dashed min-h-[300px]">
            <LightbulbIcon className="w-12 h-12 text-gray-400 mb-4" />
            <p className="text-brand-text-secondary">請從左側選擇一個行動項目以開始計算。</p>
          </div>
        ) : (
          <div className="bg-white p-4 rounded-lg border border-gray-200 flex-shrink-0">
            <div className="flex justify-between items-start gap-2">
              <h4 className="font-bold text-lg text-brand-primary">{selectedAction.label}</h4>
              <div className="flex flex-col items-end flex-shrink-0 gap-1.5">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${periodColors[selectedAction.calculationPeriod]}`}>
                    {periodLabels[selectedAction.calculationPeriod]}
                  </span>
                   <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${actionTypeColors[selectedAction.actionType]}`}>
                    {actionTypeLabels[selectedAction.actionType]}
                  </span>
              </div>
            </div>

            <p className="mt-2 text-sm text-brand-text-secondary">{selectedAction.explanation}</p>
            
            <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-gray-600 space-y-1">
              <div className="flex items-start">
                <strong className="font-semibold flex-shrink-0 mr-1">計算因子來源:</strong>
                <SourceInfo text={selectedAction.factorSource} />
              </div>
              {selectedAction.conversionSource && (
                <div className="flex items-start">
                  <strong className="font-semibold flex-shrink-0 mr-1">換算依據:</strong>
                  <SourceInfo text={selectedAction.conversionSource} />
                </div>
              )}
            </div>

            <div className="mt-4">
              <label htmlFor="action-value" className="block text-sm font-medium text-gray-700 mb-1">
                輸入數量
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="number"
                  id="action-value"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="focus:ring-brand-primary focus:border-brand-primary block w-full pl-4 pr-16 text-lg py-3 border-gray-300 rounded-md"
                  placeholder="請輸入數字"
                  min="0"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <span className="text-gray-500 sm:text-sm">{selectedAction.unit}</span>
                </div>
              </div>
            </div>
             <button
                onClick={handleAdd}
                disabled={!inputValue || parseFloat(inputValue) <= 0}
                className="mt-4 w-full bg-brand-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
             >
                新增至計畫
             </button>
          </div>
        )}

        <div className="mt-6 flex-grow flex flex-col min-h-0">
          <h4 className="font-bold text-lg text-brand-text-primary mb-2 flex-shrink-0">減碳計畫列表</h4>
          <div className="bg-white rounded-lg border border-gray-200 p-2 flex-grow overflow-y-auto">
              {planItems.length === 0 ? (
                  <p className="text-center text-gray-500 py-4 h-full flex items-center justify-center">您的計畫列表是空的。</p>
              ) : (
                  <ul className="divide-y divide-gray-200">
                      {planItems.map((item, index) => {
                        const IconComponent = iconsMap[item.icon];
                        return (
                          <li key={`${item.id}-${index}`} className="flex items-center p-2 space-x-3">
                            <div className="flex-shrink-0">
                              {IconComponent && <IconComponent className="w-6 h-6 text-brand-primary" />}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-brand-text-primary truncate">{item.label}</p>
                                <div className="flex items-center text-sm text-gray-500 flex-wrap gap-x-1.5 gap-y-1 mt-1">
                                  <span>{item.value} {item.unit}</span>
                                  <span className="hidden sm:inline">·</span>
                                  <span className={`text-xs font-medium px-1.5 py-0.5 rounded-full ${periodColors[item.calculationPeriod]}`}>
                                    {periodLabels[item.calculationPeriod]}
                                  </span>
                                  <span className={`text-xs font-medium px-1.5 py-0.5 rounded-full ${actionTypeColors[item.actionType]}`}>
                                    {actionTypeLabels[item.actionType]}
                                  </span>
                                </div>
                            </div>
                            <div className="text-right flex-shrink-0">
                                <span className="font-semibold text-green-600">{item.reduction.toFixed(2)} kg</span>
                            </div>
                            <button onClick={() => onRemoveItem(item.id, index)} className="ml-2 text-gray-400 hover:text-red-500" aria-label={`移除 ${item.label}`}>
                                <TrashIcon className="w-5 h-5" />
                            </button>
                          </li>
                        )
                      })}
                  </ul>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculationPanel;