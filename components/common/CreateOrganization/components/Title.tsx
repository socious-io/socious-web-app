import React, {ReactNode} from 'react';

interface Props {
  children: ReactNode;
  description?: string;
  border?: boolean;
}

const Title: React.FC<Props> = ({children, description, border = true}) => {
  return (
    <>
      <h1
        className={`py-6 text-lg sm:text-base text-left pl-6 ${
          border ? 'border-b' : null
        } border-grayLineBased`}
      >
        {children}
        <span className="block text-graySubtitle mt-2 font-worksans text-base sm:text-sm">
          {description}
        </span>
      </h1>
    </>
  );
};

export default Title;
