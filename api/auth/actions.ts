import {IUpdateUserBody, UserProfile} from '@models/profile';
import {get, post} from 'utils/request';

export function signup(
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  username?: string,
) {
  return post('/auth/register', {
    first_name: firstName,
    last_name: lastName,
    email,
    username,
    password,
  });
}

export function checkEmailExist(email: string) {
  return post('/auth/preregister', {email});
}

export function login(email: string, password: string) {
  return post('/auth/web/login', {email, password});
}

export function forgetPassword(email: string) {
  return post('/auth/forget-password', {email});
}

export function confirmOTP(email: string, code: string) {
  return get(`/auth/otp/confirm/web?email=${email}&code=${code}`);
}

export function directChangePassword(password: string) {
  return post('/user/change-password-direct', {password});
}

export function changePassword(currentPassword: string, newPassword: string) {
  return post('/user/change-password', {
    current_password: currentPassword,
    password: newPassword,
  });
}

export function updateProfile(userBody: IUpdateUserBody) {
  return post<UserProfile>('/user/update/profile', userBody);
}

export function logout() {
  return post('/auth/logout', {});
}
