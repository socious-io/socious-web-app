/* eslint-disable react-hooks/rules-of-hooks */
import {get, put} from 'utils/request';
import {ApiConstants } from 'utils/api';
import useSWR from 'swr'

const useUser = () => {

  const getProfile = () => {
    const { data: user, mutate: mutateUser } = useSWR<JSON>("/api/v2/user/profile");
    
  };

  const getOthersProfile = (id: string) => {
    return new Promise((resolve: (response: any) => void, reject) => {
      get(`/user/${id}/profile`)
        .then((response: any) => {
          resolve(response);  
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  };

  const changePassword = (data: any) => {
    const body = {
      current_password: data?.currentPassword,
      password: data?.newPassword,
    };

    return new Promise((resolve: (response: any) => void, reject) => {
      put(ApiConstants.CHANGE_PASSWORD, body)
        .then((response: any) => {
          resolve(response);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  };
  const directChangePassword = (data: any) => {
    const body = {
      password: data?.password,
    };

    return new Promise((resolve: (response: any) => void, reject) => {
      put(ApiConstants.CHANGE_PASSWORD_DIRECT, body)
        .then((response: any) => {
          resolve(response);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  };
  const updateProfile = (data: any) => {
    const body = data;

    // {
    //     first_name: data?.firstName,
    //     last_name : data?.lastName,
    //     bio: data?.biography,
    //     city: data?.city,
    //     address: data?.address,
    //     wallet_address: data?.walletAddress,
    //     social_causes: data?.socialCauses,
    // };

    return new Promise((resolve: (response: any) => void, reject) => {
      request
        .put(ApiConstants.GET_PROFILE, body)
        .then((response: any) => {
          resolve(response);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  };

  return {
    changePassword,
    directChangePassword,
    updateProfile,
    getProfile,
    getOthersProfile,
  };
};

export default useUser;
