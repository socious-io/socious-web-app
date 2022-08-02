import useRequest from 'hooks/useRequest';
import {ApiConstants, DEV_MODE_API} from 'utils/api';
import {stringSingleSpace} from 'utils/validate';

const useAuth = () => {
  const request = useRequest();

  const signup = (data: any) => {
    const body = {
      first_name: stringSingleSpace(data?.firstName),
      last_name: stringSingleSpace(data?.lastName),
      username: stringSingleSpace(data?.username),
      email: data?.email,
      password: data?.password,
    };

    return new Promise((resolve: (response: any) => void, reject) => {
      request
        .post(DEV_MODE_API + ApiConstants.REGISTER, body)
        .then((response: any) => {
          //access_token
          resolve(response);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  };
  const login = (data: any) => {
    const body = {
      email: data?.email,
      password: data?.password,
    };

    return new Promise((resolve: (response: any) => void, reject) => {
      request
        .post(DEV_MODE_API + ApiConstants.LOGIN, body)
        .then((response: any) => {
          //access_token
          resolve(response);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  };
  const sendOTP = (data: any) => {
    const body = data?.email
      ? {
          email: data?.email,
        }
      : {phone: data?.password};

    return new Promise((resolve: (response: any) => void, reject) => {
      request
        .post(DEV_MODE_API + ApiConstants.SEND_OTP, body)
        .then((response: any) => {
          resolve(response);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  };
  const confirmOTP = (data: any) => {
    const body = data?.email
      ? {
          email: data?.email,
          code: data?.code,
        }
      : {phone: data?.password, code: data?.code};

    return new Promise((resolve: (response: any) => void, reject) => {
      request
        .post(DEV_MODE_API + ApiConstants.SEND_OTP_CONFIRM, body)
        .then((response: any) => {
          resolve(response);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  };
  const forgetPassword = (data: any) => {
    const body = data?.email
      ? {
          email: data?.email,
        }
      : {phone: data?.password};

    return new Promise((resolve: (response: any) => void, reject) => {
      request
        .post(DEV_MODE_API + ApiConstants.RESET_PASSWORD, body)
        .then((response: any) => {
          resolve(response);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  };
  const checkEmailExist = (email: string) => {
    const body = {email};

    return new Promise((resolve: (response: any) => void, reject) => {
      request
        .put(DEV_MODE_API + ApiConstants.CHECK_EMAIL_EXIST, body)
        .then((response: any) => {
          resolve(response);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  };

  return {signup, checkEmailExist, login, sendOTP, confirmOTP, forgetPassword};
};

export default useAuth;
