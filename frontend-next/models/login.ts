import {UserProfile} from './profile';

export type FormLoginType = {
  email?: string;
  password?: string;
  token_device?: string;
};
export type LoginResponse = {
  access_token: string;
  expires_at: string;
  profile: UserProfile;
};