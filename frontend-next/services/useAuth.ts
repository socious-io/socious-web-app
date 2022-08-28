import useRequest from 'hooks/request';
import {ApiConstants} from 'utils/api';
import {stringSingleSpace} from 'utils/validate';

const useAuth = () => {
  const request = useRequest();
  const API_BASE_URL = process.env.API_BASE_URL

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
        .post(API_BASE_URL + ApiConstants.REGISTER, body)
        .then((response: any) => {
          //access_token
          resolve(response);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  };

  const login = async (data: any) => {
    const body = {
      email: data?.email,
      password: data?.password,
    };

    return new Promise((resolve: (response: any) => void, reject) => {
      request
        .post(API_BASE_URL + ApiConstants.LOGIN, body)
        .then((response: any) => {
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
        .post(API_BASE_URL + ApiConstants.SEND_OTP, body)
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
        .post(API_BASE_URL + ApiConstants.SEND_OTP_CONFIRM, body)
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
        .post(API_BASE_URL + ApiConstants.RESET_PASSWORD, body)
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
        .put(API_BASE_URL + ApiConstants.CHECK_EMAIL_EXIST, body)
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
