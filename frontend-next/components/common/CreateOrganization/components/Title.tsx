import React, { ReactNode } from 'react';

const Title:React.FC<ReactNode> = ({children}) => {
  return (
    <h1 className="py-6 text-lg sm:text-base text-left pl-6 border-b border-grayLineBased">
      {children}
    </h1>
  );
};

export default Title;
