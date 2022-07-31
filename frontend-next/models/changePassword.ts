export type FormChangePasswordType = {
    current_password: string;
    new_password: string;
    confirm_new_password: string;
  };
  
  export type ChangePasswordResponse = {
    message: string;
  };