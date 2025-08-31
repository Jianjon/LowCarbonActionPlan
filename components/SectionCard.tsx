
import React from 'react';

interface SectionCardProps {
  title: string;
  content?: string;
  children?: React.ReactNode;
}

const SectionCard: React.FC<SectionCardProps> = ({ title, content, children }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm border-t-4 border-brand-primary">
      <h3 className="text-lg font-bold text-brand-primary mb-3">{title}</h3>
      {content && <p className="text-brand-text-primary whitespace-pre-wrap">{content}</p>}
      {children}
    </div>
  );
};

export default SectionCard;