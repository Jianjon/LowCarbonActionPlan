
import React, { useState } from 'react';
import Modal from './Modal';
import InfoIcon from './icons/InfoIcon';

interface SourceInfoProps {
  text: string;
}

const SourceInfo: React.FC<SourceInfoProps> = ({ text }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsModalOpen(true)}
        className="text-blue-600 hover:text-blue-800 underline flex items-center text-xs"
        aria-label="查看資料來源"
      >
        <InfoIcon className="h-4 w-4 mr-1" />
        {text}
      </button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3 className="text-lg font-bold text-brand-primary">資料來源</h3>
        <p className="mt-2 text-brand-text-secondary">{text}</p>
      </Modal>
    </>
  );
};

export default SourceInfo;
