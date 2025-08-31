import React from 'react';

interface TotalReductionInfoProps {
  totalReduction: number;
}

const TotalReductionInfo: React.FC<TotalReductionInfoProps> = ({ totalReduction }) => {
  // 1 棵樹每年約吸收 15 公斤 CO2e (參考 calculatorConstants)
  const TREE_ABSORPTION_FACTOR = 15;
  const equivalentTrees = totalReduction / TREE_ABSORPTION_FACTOR;

  const displayValue = totalReduction >= 1000
    ? (totalReduction / 1000).toLocaleString(undefined, { maximumFractionDigits: 2 })
    : totalReduction.toLocaleString(undefined, { maximumFractionDigits: 2 });

  const displayUnit = totalReduction >= 1000 ? '公噸' : '公斤';

  return (
    <div className="bg-gradient-to-br from-teal-600 to-cyan-700 text-white rounded-lg p-4 text-center shadow-lg">
      <h4 className="text-sm uppercase tracking-wider text-teal-100">預估總減碳量</h4>
      <div className="my-2">
        <span className="text-4xl font-bold">{displayValue}</span>
        <span className="text-xl ml-2">{displayUnit} (CO₂e)</span>
      </div>
      <div className="mt-2 text-teal-200 bg-black bg-opacity-20 rounded-full px-3 py-1 inline-block">
        <p>
          相當於 🌳 為地球多種了 <span className="font-bold">{equivalentTrees.toFixed(1)}</span> 棵樹
        </p>
      </div>
    </div>
  );
};

export default TotalReductionInfo;
