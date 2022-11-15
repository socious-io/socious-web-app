import {UseFormReturn} from 'react-hook-form';
export interface StepProps {
  onSubmit: (value: any) => void;
}
export interface StepFormProps {
  formMethods: UseFormReturn;
  onSubmit: (value: any) => void;
}
export interface StepWithError {
  onSubmit: (value: any) => any;
  error: string;
}

export interface StepWithResend extends StepProps {
  onResendCode: (onClickReset?: any) => void;
}
export interface StepWithResendAndError extends StepWithError {
  onResendCode: (onClickReset?: any) => void;
  email?: string;
}
