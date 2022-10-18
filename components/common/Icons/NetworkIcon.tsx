import React from 'react';

const NetworkIcon = ({
  className,
  strokeColor = '#BEC0C7',
  strokeWidth = '1.4',
}: {
  className?: string;
  strokeColor?: string;
  strokeWidth?: string;
}) => {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.8855 7.88722C9.37287 7.88722 10.5786 6.68147 10.5786 5.1941C10.5786 3.70673 9.37287 2.50098 7.8855 2.50098C6.39813 2.50098 5.19238 3.70673 5.19238 5.1941C5.19238 6.68147 6.39813 7.88722 7.8855 7.88722Z"
        stroke={strokeColor}
        stroke-width={strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M13.2725 16.8646H2.5V15.6676C2.5 14.2391 3.06748 12.8691 4.07759 11.859C5.08771 10.8489 6.45772 10.2814 7.88624 10.2814C9.31476 10.2814 10.6848 10.8489 11.6949 11.859C12.705 12.8691 13.2725 14.2391 13.2725 15.6676V16.8646Z"
        stroke={strokeColor}
        stroke-width={strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12.6738 2.50098C13.3881 2.50098 14.0731 2.78472 14.5782 3.28977C15.0832 3.79483 15.3669 4.47984 15.3669 5.1941C15.3669 5.90836 15.0832 6.59336 14.5782 7.09842C14.0731 7.60348 13.3881 7.88722 12.6738 7.88722"
        stroke={strokeColor}
        stroke-width={strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M14.5889 10.5088C15.6085 10.8967 16.4863 11.585 17.1061 12.4827C17.7259 13.3803 18.0586 14.4451 18.06 15.536V16.8646H16.2646"
        stroke={strokeColor}
        stroke-width={strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default NetworkIcon;
