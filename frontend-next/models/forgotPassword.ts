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
  message: string;
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
