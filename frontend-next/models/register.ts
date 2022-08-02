import {UserProfile} from './profile';

export type RegisterResponse = {
  access_token: string;
  expires_at: string;
  profile: UserProfile;
};

export interface RegisterFormStep1Type {
  firstName: string;
  lastName: string;
}

export interface RegisterFormStep2Type {
  email: string;
}

export interface RegisterFormStep3Type {
  password: string;
  confirmPassword: string;
}

export type RegisterFormType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  token_device?: string;
  lang?: string;
  langDevice?: string;
};
export type CheckEmailExitsBody = {
  email: string;
};
