/* eslint-disable react-hooks/rules-of-hooks */
import {get} from 'utils/request';
import {ApiConstants } from 'utils/api';
import useSWR from 'swr'
import { useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import path from 'path';

interface UseUserProps {
  redirectIfFound?: boolean;
  redirect?: boolean;
  redirectTo?: string;
  shouldRetry?: boolean;
  onAuthError?: boolean;
  forceStop?: boolean
}

const useUser = ({
    redirectIfFound = false,
    redirectTo = "",
    // Force Stop redirect logic.
    // Implemented to try Password expired
    forceStop = false,

    shouldRetry = true,
    onAuthError = true
  }: UseUserProps
) => {
  const { data: user, error: userError, mutate: mutateUser } = useSWR<any>("/api/v2/user/profile", get, {
    shouldRetryOnError: shouldRetry,
    onErrorRetry: (error) => {
      if (!onAuthError && error.response.status === 401) return
    }
  });
  const { pathname } = useRouter();

  useEffect(() => {
    // if user && error both are undefined
    if (!user && !userError) return
    
    if (forceStop) return

    // if user unauthorized || or any error
    if (userError && userError.response.status === 401) {
      // if page !== home
      if (pathname !== "/") {
        // => redirect to /auth/login 
        Router.push("/auth/login");
        // => add ?redirect_to=/profile
      }
    }

    
    // if user authorized
      // if page === home [doesn't need to be home]
      // if user === new_user
    if (user && !user.skills && !user.passions) {
      //=> redirect to /auth/onboarding
      Router.push("/auth/onboarding");
    }    

  }, [user, pathname, userError, forceStop])
  return {user, userError, mutateUser};
};

export default useUser;
