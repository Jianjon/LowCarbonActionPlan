
import React from 'react';
import SparklesIcon from './icons/SparklesIcon';
import InspirationPanel from './InspirationPanel';

interface InputPanelProps {
  userInput: string;
  setUserInput: (value: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const InputPanel: React.FC<InputPanelProps> = ({ userInput, setUserInput, onGenerate, isLoading }) => {
  const placeholderText = "例如：我想在社區的公共空間建立一個雨水回收系統，用來澆灌植物。\n\n或者：我們社區想把中庭的傳統路燈更換成太陽能 LED 燈。\n\n或者：我想推動一個社區農園計畫，讓居民可以種植自己的蔬菜，並將廚餘做成堆肥。";

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-xl font-semibold text-brand-text-primary mb-2">1. 描述您的改造構想</h2>
      <p className="text-brand-text-secondary mb-4">
        請盡可能詳細地描述您想執行的低碳改造計畫，AI 將依此為您生成一份完整的計畫書草案。
      </p>

      <InspirationPanel />

      <div className="flex-grow mt-6">
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder={placeholderText}
          className="w-full h-48 md:h-full min-h-[150px] p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition duration-200 resize-none"
          disabled={isLoading}
        />
      </div>
      <button
        onClick={onGenerate}
        disabled={isLoading || !userInput.trim()}
        className="mt-4 w-full bg-brand-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center shadow-lg transform hover:scale-105"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            生成中...
          </>
        ) : (
          <>
            <SparklesIcon className="w-5 h-5 mr-2" />
            生成計畫書草案
          </>
        )}
      </button>
    </div>
  );
};

export default InputPanel;