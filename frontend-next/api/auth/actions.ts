import {fetcher} from 'utils/api';
import { SendOTPResponse } from '@models/forgotPassword';

export async function signup(firstName: string, lastName: string, email: string, password: string, username?: string): Promise<void> {
  await fetcher('/api/v2/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      first_name: firstName,
      last_name: lastName,
      email,
      username,
      password,
    }),
  });
}

export async function checkEmailExist(email: string): Promise<any> {
  return await fetcher('/api/v2/auth/preregister', {
    method: 'POST',
    body: JSON.stringify({
      email,
    }),
  });
}

export async function login(email: string, password: string): Promise<void> {
  await fetcher('/api/v2/auth/web/login', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
    }),
  });
}

export async function forgetPassword(email: string): Promise<void> {
  await fetcher('/api/v2/auth/forget-password', {
    method: 'POST',
    body: JSON.stringify({
      email,
    }),
  });
}

export async function confirmOTP(email: string, code: string): Promise<void> {
  const data: SendOTPResponse = await fetcher(`/api/v2/auth/otp/confirm?email=${email}&code=${code}`);
  localStorage.setItem("access-token", data.access_token);
}

export async function directChangePassword(password: string): Promise<void> {
  const token = localStorage.getItem("access-token");
  await fetcher("/api/v2/user/change-password-direct", {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`
   },
    body: JSON.stringify({
      password,
    }),
  });
  localStorage.removeItem("access-token");
}