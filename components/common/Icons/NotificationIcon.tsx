import React from 'react';

const NotificationIcon = ({
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
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.0789 1.5C11.6681 1.5 13.1922 2.1313 14.3159 3.25503C15.4396 4.37876 16.0709 5.90286 16.0709 7.49206C16.0709 14.1546 18.5013 15.4675 19.1578 15.4675H1C1.67044 15.4675 4.08682 14.1406 4.08682 7.49206C4.08682 5.90286 4.71812 4.37876 5.84185 3.25503C6.96558 2.1313 8.48968 1.5 10.0789 1.5V1.5Z"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.98364 18.0234C8.10438 18.4872 8.37557 18.8978 8.75472 19.1909C9.13387 19.484 9.59955 19.643 10.0788 19.643C10.558 19.643 11.0237 19.484 11.4028 19.1909C11.782 18.8978 12.0532 18.4872 12.1739 18.0234"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default NotificationIcon;
