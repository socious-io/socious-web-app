import {FC, ReactElement} from 'react';
import {FormProvider, useForm} from 'react-hook-form';

import {FormWizardData} from 'hooks/useFormWizard';
import {joiResolver} from '@hookform/resolvers/joi';

export interface FormWizardProps {
  wizard: FormWizardData;
  children: Array<ReactElement<any, any>>;
}

// const SchemaProvider: FC<{
//   schema: any;
//   children: ReactElement<any, any>;
// }> = ({schema, children}) => {
//   const methods = useForm({resolver: joiResolver(schema)});

//   return <FormProvider {...methods}>{children}</FormProvider>;
// };

export const FormWizard: FC<FormWizardProps> = ({wizard, children}) => {
  const child = children[wizard.step];

  if (!child) return <></>;

  if (wizard.methods[wizard.step])
    return (
      <FormProvider {...wizard.methods[wizard.step]}>{child}</FormProvider>
    );

  // if (wizard.schemas[wizard.step])
  //   return (
  //     <SchemaProvider schema={wizard.schemas[wizard.step]}>
  //       {child}
  //     </SchemaProvider>
  //   );

  return child;
};
