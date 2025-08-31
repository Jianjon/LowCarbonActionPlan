
import React from 'react';

const LightbulbIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M9 18h6" />
    <path d="M10 22h4" />
    <path d="M12 14v4" />
    <path d="M8.5 12.5a5.1 5.1 0 0 1-1-3 5 5 0 0 1 9-2 4.7 4.7 0 0 1 1 3c0 .8-.2 1.5-.5 2.2" />
    <path d="M12 2a7.5 7.5 0 0 0-5.3 12.8" />
  </svg>
);

export default LightbulbIcon;
