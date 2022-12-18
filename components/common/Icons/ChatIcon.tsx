import React from 'react';

const ChatIcon = ({
  className,
  strokeColor = '#BEC0C7',
  strokeWidth = '1.38465',
}: {
  className?: string;
  strokeColor?: string;
  strokeWidth?: string;
}) => {
  return (
    <svg
      className={className}
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.07697 17.6365L3 18.1626L4.38465 14.0087V5.70081C4.38465 5.33358 4.53053 4.98139 4.7902 4.72172C5.04987 4.46204 5.40206 4.31616 5.76929 4.31616H16.8465C17.2137 4.31616 17.5659 4.46204 17.8255 4.72172C18.0852 4.98139 18.2311 5.33358 18.2311 5.70081V7.77778"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.1537 20.9315L21 22.3162L20.3076 18.1622V12.6237C20.3076 12.2564 20.1618 11.9042 19.9021 11.6446C19.6424 11.3849 19.2902 11.239 18.923 11.239H9.92279C9.55556 11.239 9.20337 11.3849 8.9437 11.6446C8.68403 11.9042 8.53815 12.2564 8.53815 12.6237V19.5469C8.53815 19.9141 8.68403 20.2663 8.9437 20.526C9.20337 20.7857 9.55556 20.9315 9.92279 20.9315H16.1537Z"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ChatIcon;
