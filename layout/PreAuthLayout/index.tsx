import {FC, PropsWithChildren} from 'react';

const PreAuthLayout: FC<PropsWithChildren> = ({children}) => {
  return <div className="sm:pt-24">{children}</div>;
};

export default PreAuthLayout;
