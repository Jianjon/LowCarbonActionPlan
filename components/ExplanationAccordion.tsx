
import React, { useState } from 'react';
import type { ExplanationData } from '../types';

interface AccordionItemProps {
  item: ExplanationData;
  isOpen: boolean;
  onClick: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ item, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center py-4 text-left text-lg font-semibold text-brand-text-primary"
        aria-expanded={isOpen}
      >
        <span>{item.title}</span>
        <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </span>
      </button>
      {isOpen && (
        <div className="pb-4 px-2 space-y-4">
          {item.content.map((section, index) => (
            <div key={index}>
              <h4 className="font-bold text-brand-primary">{section.title}</h4>
              <p className="mt-1 text-brand-text-secondary whitespace-pre-wrap">{section.details}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

interface ExplanationAccordionProps {
  items: ExplanationData[];
}

const ExplanationAccordion: React.FC<ExplanationAccordionProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          item={item}
          isOpen={openIndex === index}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
};

export default ExplanationAccordion;
