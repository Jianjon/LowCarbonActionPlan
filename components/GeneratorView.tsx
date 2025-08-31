
import React, { useState, useCallback } from 'react';
import InputPanel from './InputPanel';
import OutputPanel from './OutputPanel';
import { generatePlan } from '../services/geminiService';
import type { LowCarbonPlan } from '../types';

const GeneratorView: React.FC = () => {
  const [userInput, setUserInput] = useState<string>('');
  const [generatedPlan, setGeneratedPlan] = useState<LowCarbonPlan | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGeneratePlan = useCallback(async () => {
    if (!userInput.trim()) {
      setError('請輸入您的改造計畫內容。');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedPlan(null);

    try {
      const plan = await generatePlan(userInput);
      setGeneratedPlan(plan);
    } catch (err) {
      console.error(err);
      setError('生成計畫時發生錯誤，請稍後再試。');
    } finally {
      setIsLoading(false);
    }
  }, [userInput]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
      <InputPanel
        userInput={userInput}
        setUserInput={setUserInput}
        onGenerate={handleGeneratePlan}
        isLoading={isLoading}
      />
      <OutputPanel
        plan={generatedPlan}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
};

export default GeneratorView;
