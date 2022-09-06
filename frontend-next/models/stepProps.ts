import {UseFormReturn} from 'react-hook-form';
export interface StepProps {
  onSubmit: (value: any) => void;
}
export interface StepFormProps {
  formMethods: UseFormReturn;
  onSubmit: (value: any) => void;
}
export interface StepWithError{
  onSubmit: (value: any) => any;
  error: string;
}
export interface StepWithResendAndError extends StepWithError {
  onResendCode: (onClickReset: any) => void;
}
