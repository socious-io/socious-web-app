import { get, post, put } from "utils/request"
import { fetcher } from "utils/api";

export async function signup(firstName: string, lastName: string, email: string, password: string, username?: string): Promise<void> {
  const data = {
    first_name: firstName,
    last_name: lastName,
    email,
    username,
    password,
  }
  await post('/api/v2/auth/register', data)
}

export async function checkEmailExist(email: string): Promise<any> {
  return await post('/api/v2/auth/preregister', { email } )
}

export async function login(email: string, password: string): Promise<void> {
  await post('/api/v2/auth/web/login', { email, password })
}

export async function forgetPassword(email: string): Promise<void> {
  await post('/api/v2/auth/forget-password', { email });
}

export async function confirmOTP(email: string, code: string): Promise<void> {
  const response = await get(`/api/v2/auth/otp/confirm/web?email=${email}&code=${code}`);
  console.log("RSP", response);
}

export async function directChangePassword(password: string): Promise<void> {
  await put('/api/v2/user/change-password-direct', { password });
}

export async function changePassword(currentPassword: string, newPassword: string): Promise<void> {
  await fetcher("/api/v2/user/change-password", {
    method: 'PUT',
    body: JSON.stringify({
      current_password: currentPassword,
      password: newPassword,
    })
  })
}