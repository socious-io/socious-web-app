import {AxiosError} from 'axios';
import useSWR, {useSWRConfig} from 'swr';
import {useEffect} from 'react';
import Router, {useRouter} from 'next/router';

import {LoginIdentity} from './../../models/identity';
import {get} from 'utils/request';
import {logout} from '@api/auth/actions';

interface UseUserOptions {
  redirect: boolean;
}

const defaultValues = {
  redirect: true,
};

function authFetcher<T>(url: string) {
  return get<T>(url).catch((error) => {
    if (error?.response?.status === 401) return null;
    throw error;
  });
}

export const useUser = (options?: UseUserOptions) => {
  const {redirect} = {...defaultValues, ...options};
  const {pathname} = useRouter();

  const {
    data: identities,
    error: identitiesError,
    mutate: mutateIdentities,
  } = useSWR<Array<LoginIdentity> | null, AxiosError, string>(
    '/identities',
    authFetcher,
    {
      onErrorRetry: (error) => {
        const status = error?.response?.status;
        if (status && status < 500) return null;
      },
      // revalidateOnFocus: false,
    },
  );

  const currentIdentity = identities?.find(
    (identity: LoginIdentity) => identity.current,
  );

  // TODO type defs for user/org
  const {
    data: user,
    error: userError,
    mutate: mutateUser,
  } = useSWR<any, AxiosError, string | null>(
    identities
      ? currentIdentity?.type === 'users'
        ? '/user/profile'
        : `/orgs/${currentIdentity?.id}`
      : null,
    authFetcher,
    {
      revalidateOnFocus: false,
      onErrorRetry: (error) => {
        const status = error?.response?.status;
        if (status && status < 500) return;
      },
    },
  );

  useEffect(() => {
    // for emergencies
    console.log('Storing window.logout for emergencies');
    window.logout = async () => {
      await logout();
      mutateIdentities();
      mutateUser();
    };

    // if user unauthorized
    if (identities === null && redirect) {
      Router.push(`/auth/login?redirect_to=${pathname}`);
    }

    // if user && error both are undefined
    if (!user && !userError) return;

    // if user authorized
    if (user) {
      // if user has requested forgot password.
      if (user.password_expired) {
        Router.push('/auth/forgotpassword');
        return;
      } else if (pathname.startsWith('/auth/forgotpassword')) {
        // if user trying to access /auth/forgotpassword when password not expired
        Router.push('/');
      }

      // if user === new_user
      // if (!user.skills && !user.passions && currentIdentity?.type === 'users') {
      //   Router.push('/auth/onboarding');
      // }
    }
  }, [
    user,
    pathname,
    userError,
    mutateIdentities,
    mutateUser,
    currentIdentity?.type,
    identities,
    redirect,
  ]);
  return {
    user,
    userError,
    mutateUser,
    currentIdentity,
    identities,
    identitiesError,
    mutateIdentities,
  };
};

export default useUser;

declare global {
  interface Window {
    logout: () => any;
  }
}
