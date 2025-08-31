
import React from 'react';

const SunBoltIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M12 1v2"></path>
    <path d="M12 21v2"></path>
    <path d="m4.22 4.22 1.42 1.42"></path>
    <path d="m18.36 18.36 1.42 1.42"></path>
    <path d="M1 12h2"></path>
    <path d="M21 12h2"></path>
    <path d="m4.22 19.78 1.42-1.42"></path>
    <path d="m18.36 5.64 1.42-1.42"></path>
    <path d="m13.5 12-3 5h4l-3 5"></path>
    <circle cx="12" cy="12" r="5"></circle>
  </svg>
);

export default SunBoltIcon;
