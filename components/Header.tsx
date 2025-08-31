
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-teal-600 to-cyan-700 shadow-lg">
      <div className="container mx-auto px-4 py-4 md:px-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
          低碳行動改造計畫生成器
        </h1>
        <p className="text-teal-100 mt-1">AI 助您輕鬆撰寫永續計畫書</p>
      </div>
    </header>
  );
};

export default Header;