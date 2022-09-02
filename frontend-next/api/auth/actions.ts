import { deleteRequest, get, post, put } from "utils/request"

export async function signup(firstName: string, lastName: string, email: string, password: string, username?: string): Promise<void> {
  await post('/api/v2/auth/register', {
    first_name: firstName,
    last_name: lastName,
    email,
    username,
    password,
  });
}

export async function checkEmailExist(email: string): Promise<any> {
  return await post('/api/v2/auth/preregister', { email });
}

export async function login(email: string, password: string): Promise<void> {
  await post('/api/v2/auth/web/login', { email, password });
}

export async function forgetPassword(email: string): Promise<void> {
  await post('/api/v2/auth/forget-password', { email });
}

export async function confirmOTP(email: string, code: string): Promise<void> {
  await get(`/api/v2/auth/otp/confirm/web?email=${email}&code=${code}`);
}

export async function directChangePassword(password: string): Promise<void> {
  await put('/api/v2/user/change-password-direct', { password });
}

export async function changePassword(currentPassword: string, newPassword: string): Promise<void> {
  await put("/api/v2/user/change-password", {
    current_password: currentPassword,
    password: newPassword,
  });
}

export async function updateProfile(user: any) {
  await put("/api/v2/user/profile", user);
}

// Asking for JWT token(refresh token)
export async function logout() {
  await deleteRequest("/api/v2/auth/logout");
}
