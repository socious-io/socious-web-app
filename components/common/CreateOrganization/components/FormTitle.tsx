/*
 * this component is for show light title in Basic information
 */

import React, {ReactNode} from 'react';

//props
interface Props {
  children: ReactNode;
}

const FormTitle: React.FC<Props> = ({children}) => {
  return <h2 className="py-2 text-base text-Gray03 sm:text-sm">{children}</h2>;
};

export default FormTitle;
