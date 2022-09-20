import { ReactLoadableManifest } from 'next/dist/server/load-components'
import React, { ReactNode } from 'react'
 interface Props{
  children:ReactNode;
 }
const FormTitle:React.FC<Props> = ({children}) => {
  return (
    <h2 className='text-Gray03 text-sm py-2'>
      {children}
    </h2>
  )
}

export default FormTitle
