import { deleteRequest, get, post, put } from "utils/request"

export function signup(firstName: string, lastName: string, email: string, password: string, username?: string) {
  return post('/api/v2/auth/register', {
      first_name: firstName,
      last_name: lastName,
      email,
      username,
      password,
    });
};
  
export function checkEmailExist(email: string) {
  return post('/api/v2/auth/preregister', { email });
};
  
export function login(email: string, password: string) {
  return post('/api/v2/auth/web/login', { email, password });
};
  
export function forgetPassword(email: string) {
  return post('/api/v2/auth/forget-password', { email });
};
  
export function confirmOTP(email: string, code: string) {
  return get(`/api/v2/auth/otp/confirm/web?email=${email}&code=${code}`);
};

export function directChangePassword(password: string) {
  return put('/api/v2/user/change-password-direct', { password });
};

export function changePassword(currentPassword: string, newPassword: string) {
  return put("/api/v2/user/change-password", {
      current_password: currentPassword,
      password: newPassword,
    });
};

// Asking for JWT token(refresh token)
export function logout() {
  return deleteRequest("/api/v2/auth/logout");
};