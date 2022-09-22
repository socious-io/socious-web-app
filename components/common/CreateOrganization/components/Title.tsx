import React, {ReactNode} from 'react';

//interfaces
interface Props {
  children: ReactNode;
  description?: string;
  border?: boolean; //border={true} => show bottom border
  textAlign?: 'text-left' | 'text-center' | 'text-right';
}

const Title: React.FC<Props> = ({
  children,
  textAlign = 'text-left',
  description,
  border = true,
}) => {
  return (
    <>
      <h1
        className={`py-6 text-xl sm:text-lg  ${textAlign}  px-6 ${
          border ? 'border-b' : null
        } border-grayLineBased `}
      >
        {children}
        <span className="font-worksans mt-2 block  text-base text-graySubtitle sm:text-sm">
          {description}
        </span>
      </h1>
    </>
  );
};

export default Title;
