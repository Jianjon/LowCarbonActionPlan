
import React from 'react';

const BicycleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <circle cx="5.5" cy="17.5" r="3.5"></circle>
    <circle cx="18.5" cy="17.5" r="3.5"></circle>
    <path d="M15 17.5h-9.5l1.5-6.5 3 2 3-3 3 1z"></path>
    <path d="M12 8l-2-3h4l-2 3z"></path>
    <path d="m12 12 2 2.5"></path>
  </svg>
);

export default BicycleIcon;
