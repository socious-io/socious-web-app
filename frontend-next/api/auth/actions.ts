import { deleteRequest, get, post, put } from "utils/request"

export function signup(firstName: string, lastName: string, email: string, password: string, username?: string): Promise<void> {
  return new Promise((resolve: (response: any) => void, reject) => {
    post('/api/v2/auth/register', {
      first_name: firstName,
      last_name: lastName,
      email,
      username,
      password,
    }).then((response: any) => {
      resolve(response);  
    })
    .catch((error: any) => {
      reject(error);
    });
  });
}
  
export function checkEmailExist(email: string): Promise<any> {
  return new Promise((resolve: (response: any) => void, reject) => {
    post('/api/v2/auth/preregister', { email })
    .then((response: any) => {
      resolve(response);  
    })
    .catch((error: any) => {
      reject(error);
    });
  });
}
  
  export function login(email: string, password: string): Promise<void> {
    return new Promise((resolve: (response: any) => void, reject) => {
      post('/api/v2/auth/web/login', { email, password })
      .then((response: any) => {
        resolve(response);  
      })
      .catch((error: any) => {
        reject(error);
      });
    });
  } 
  
  export function forgetPassword(email: string): Promise<void> {
    return new Promise((resolve: (response: any) => void, reject) => {
      post('/api/v2/auth/forget-password', { email })
      .then((response: any) => {
        resolve(response);  
      })
      .catch((error: any) => {
        reject(error);
      });
    });
  }
  
  export function confirmOTP(email: string, code: string): Promise<void> {
    return new Promise((resolve: (response: any) => void, reject) => {
      get(`/api/v2/auth/otp/confirm/web?email=${email}&code=${code}`)
      .then((response: any) => {
        resolve(response);  
      })
      .catch((error: any) => {
        reject(error);
      });
    });
  }
  
  export function directChangePassword(password: string): Promise<void> {
    return new Promise((resolve: (response: any) => void, reject) => {
      put('/api/v2/user/change-password-direct', { password })
      .then((response: any) => {
        resolve(response);  
      })
      .catch((error: any) => {
        reject(error);
      });
    });
  }
  
  export function changePassword(currentPassword: string, newPassword: string): Promise<void> {
    return new Promise((resolve: (response: any) => void, reject) => {
      put("/api/v2/user/change-password", {
        current_password: currentPassword,
        password: newPassword,
      })
      .then((response: any) => {
        resolve(response);  
      })
      .catch((error: any) => {
        reject(error);
      });
    });
}
  
  // Asking for JWT token(refresh token)
export function logout() {
  return new Promise((resolve: (response: any) => void, reject) => {
    deleteRequest("/api/v2/auth/logout")
    .then((response: any) => {
      resolve(response);  
    })
    .catch((error: any) => {
      reject(error);
    });
  });
}