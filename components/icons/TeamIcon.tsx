
import React from 'react';

const TeamIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M12 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM12 19a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
    <path d="M12 8a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7Z"></path>
    <path d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path>
  </svg>
);

export default TeamIcon;
