import {ReactLoadableManifest} from 'next/dist/server/load-components';
import React, {ReactNode} from 'react';
interface Props {
  children: ReactNode;
}
const FormTitle: React.FC<Props> = ({children}) => {
  return <h2 className="py-2 text-base text-Gray03 sm:text-sm">{children}</h2>;
};

export default FormTitle;
