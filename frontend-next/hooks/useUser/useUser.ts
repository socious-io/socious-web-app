/* eslint-disable react-hooks/rules-of-hooks */
import {get} from 'utils/request';
import {ApiConstants } from 'utils/api';
import useSWR from 'swr'
import { useEffect } from 'react';
import Router, { useRouter } from 'next/router';

interface UseUserProps {
  shouldRetry?: boolean;
  onAuthError?: boolean;
  forceStop?: boolean
};

const defaultValues = {
  // Force Stop redirect logic.
  // Implemented to try Password expired
  forceStop: false,
  shouldRetry: true,
  onAuthError: false
};

const allowedRoutes = [
  "/", "/auth/forgotpassword", "/auth/login", "/auth/signup"
];

const useUser = (props: UseUserProps = 
  defaultValues
) => {
  const { forceStop, shouldRetry, onAuthError } = {...defaultValues, ...props};
  const { pathname } = useRouter();

  const { data: user, error: userError, mutate: mutateUser } = useSWR<any>("/api/v2/user/profile", get, {
    shouldRetryOnError: shouldRetry,
    onErrorRetry: (error) => {
      if (!onAuthError && error.response.status === 401) return
    }
  });


  useEffect(() => {
    // if user && error both are undefined
    if (!user && !userError) return
    if (forceStop) return

    // if user unauthorized
    if (userError && userError.response.status === 401) {
      // if page !== allowed_routes
      if (!(allowedRoutes.includes (pathname))) {
        // => add ?redirect_to=/profile
        Router.push("/auth/login");
      }
    }

    
    // if user authorized
    if (user) {
      // if user has requested forgot password.
      if (user.password_expired) {
        Router.push("/auth/forgotpassword");
        return
      } else if (pathname.startsWith("/auth/forgotpassword")) {
        // if user trying to access /auth/forgotpassword when password not expired
        Router.push("/");
      }

      // if user === new_user
      if (!user.skills && !user.passions) {
        Router.push("/auth/onboarding");
      }    
    }

  }, [user, pathname, userError, forceStop])
  return {user, userError, mutateUser};
};

export default useUser;
