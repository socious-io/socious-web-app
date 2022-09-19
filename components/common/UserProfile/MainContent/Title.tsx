import React, {PropsWithChildren} from 'react';

const Title: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <h2 className="font-worksans py-4 text-base font-semibold text-black">
      {children}
    </h2>
  );
};

export default Title;
