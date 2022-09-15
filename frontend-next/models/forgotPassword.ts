import { ErrorMessage } from "utils/request";

export type SendEmailType = {
  email: string;
};
export type SendEmailResponse = {
  message: string;
};
export type SendOTPType = {
  email: string;
  code: string;
};
export type SendOTPResponse = {
  access_token: string
};
export type ResetPasswordType = {
  email: string;
  new_password_forgot: string;
};
export type FormResetPasswordType = {
  new_password_forgot: string;
  confirm_password: string;
};
export type ResetPasswordResponse = {
  message: string;
};

export interface ForgotError {
  emailCheckError: string,
  otpError: string,
  defaultMessage: ErrorMessage,
}