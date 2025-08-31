
import React, { useState } from 'react';
import Header from './components/Header';
import Tabs from './components/Tabs';
import GeneratorView from './components/GeneratorView';
import CalculatorView from './components/CalculatorView';

type Tab = 'generator' | 'calculator';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('generator');

  return (
    <div className="min-h-screen bg-transparent font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="bg-brand-surface rounded-2xl shadow-lg p-6 md:p-8">
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
          
          {activeTab === 'generator' && <GeneratorView />}
          {activeTab === 'calculator' && <CalculatorView />}

        </div>
        <footer className="text-center mt-8 text-brand-text-secondary text-sm px-4">
          <p className="max-w-3xl mx-auto">
            <strong>免責聲明：</strong>此生成器與計算器產生的內容僅供發想與參考使用，實際申請時請務必採用真實數據與符合您計畫的具體內容。
          </p>
          <p className="mt-2">
            &copy; {new Date().getFullYear()} Low-Carbon Action Plan Generator. All rights reserved. | Made by Jon Chang
          </p>
        </footer>
      </main>
    </div>
  );
};

export default App;
