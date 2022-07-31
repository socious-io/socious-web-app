import useRequest from 'hooks/useRequest';
import { ApiConstants, DEV_MODE_API } from 'utils/api';


const useUser = () => {
    const request = useRequest();

    const changePassword = (data: any) => {
        const body = {
            current_password: data?.currentPassword,
            password: data?.newPassword,
        };

        return new Promise((resolve: (response: any) => void, reject) => {
            request
                .put(DEV_MODE_API + ApiConstants.CHANGE_PASSWORD, body)
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
            request
                .put(DEV_MODE_API + ApiConstants.CHANGE_PASSWORD_DIRECT, body)
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
                .put(DEV_MODE_API + ApiConstants.GET_PROFILE, body)
                .then((response: any) => {
                    resolve(response);
                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    };

    return { changePassword, directChangePassword ,updateProfile};
};

export default useUser;
