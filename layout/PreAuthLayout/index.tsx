import {FC, PropsWithChildren} from 'react';

const PreAuthLayout: FC<PropsWithChildren> = ({children}) => {
  return (
    <div className="sm:flex sm:min-h-screen sm:items-center sm:justify-center">
      {children}
    </div>
  );
};

export default PreAuthLayout;
