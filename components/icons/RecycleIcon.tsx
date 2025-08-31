
import React from 'react';

const RecycleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.731 1.731 0 0 1 0-1.922L6.315 12l-3.07-4.197a1.731 1.731 0 0 1 0-1.922 1.83 1.83 0 0 1 1.57-.881H7"></path>
    <path d="M12 15V9l4 3-4 3Z"></path>
    <path d="M17 19h2.185a1.83 1.83 0 0 0 1.57-.881 1.731 1.731 0 0 0 0-1.922L17.685 12l3.07-4.197a1.731 1.731 0 0 0 0-1.922 1.83 1.83 0 0 0-1.57-.881H17"></path>
  </svg>
);

export default RecycleIcon;
