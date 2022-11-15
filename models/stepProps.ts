import {UseFormReturn} from 'react-hook-form';
import {GeoIP} from './geo';
export interface StepProps {
  onSubmit: (value: any) => void;
  geoIp?: GeoIP;
}
export interface StepFormProps {
  formMethods: UseFormReturn;
  onSubmit: (value: any) => void;
}
export interface StepWithError {
  onSubmit: (value: any) => any;
  error: string;
}
export interface StepWithResendAndError extends StepWithError {
  onResendCode: (onClickReset: any) => void;
}
