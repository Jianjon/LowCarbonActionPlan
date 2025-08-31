
import React from 'react';

const HeartHomeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <path d="M9 22V12h6v10"></path>
    <path d="M12 18.26a5 5 0 0 0-3.18 8.87a5 5 0 0 0 6.36 0A5 5 0 0 0 12 18.26Z" strokeWidth="0" fill="currentColor" stroke="none"></path>
  </svg>
);

export default HeartHomeIcon;
