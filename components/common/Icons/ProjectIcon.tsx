import React from 'react';

const ProjectIcon = ({
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
        d="M16.3886 6.80664H3.65738C3.01818 6.80664 2.5 7.32482 2.5 7.96402V16.0657C2.5 16.7049 3.01818 17.2231 3.65738 17.2231H16.3886C17.0278 17.2231 17.546 16.7049 17.546 16.0657V7.96402C17.546 7.32482 17.0278 6.80664 16.3886 6.80664Z"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 11.436H17.546"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.0234 10.2786V12.5933"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.4951 6.8065C13.4951 5.88563 13.1293 5.00247 12.4781 4.35132C11.827 3.70017 10.9438 3.33435 10.0229 3.33435V3.33435C9.10206 3.33435 8.2189 3.70017 7.56775 4.35132C6.9166 5.00247 6.55078 5.88563 6.55078 6.8065"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ProjectIcon;
