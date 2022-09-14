import {LoginIdentity} from './../../models/identity';
/* eslint-disable react-hooks/rules-of-hooks */
import {get} from 'utils/request';
import {ApiConstants} from 'utils/api';
import useSWR, {useSWRConfig} from 'swr';
import {useEffect} from 'react';
import Router, {useRouter} from 'next/router';
import {logout} from '@api/auth/actions';

interface UseUserProps {
  shouldRetry?: boolean;
  forceStop?: boolean;
}

const defaultValues = {
  // Force Stop redirect logic.
  // Implemented to try Password expired
  forceStop: false,
  shouldRetry: true,
};

const allowedRoutes = [
  '/',
  '/auth/forgotpassword',
  '/auth/login',
  '/auth/signup',
];

function authFetcher<T>(url: string) {
  return get<T>(url).catch((error) => {
    if (error?.response?.status === 401) return null;
    throw error;
  });
}

export const useUser = (props: UseUserProps = defaultValues) => {
  const {forceStop, shouldRetry} = {...defaultValues, ...props};
  const {pathname} = useRouter();
  // const {mutate} = useSWRConfig();

  const {
    data: identities,
    error: identitiesError,
    mutate: mutateIdentities,
  } = useSWR<Array<LoginIdentity> | null, any, string | null>(
    !forceStop ? '/identities' : null,
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

  const {
    data: user,
    error: userError,
    mutate: mutateUser,
  } = useSWR<any>(
    identities
      ? currentIdentity?.type === 'users'
        ? '/user/profile'
        : `/orgs/${currentIdentity?.id}`
      : null,
    authFetcher,
    {
      shouldRetryOnError: shouldRetry,
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

    // if user && error both are undefined
    if (!user && !userError) return;
    if (forceStop) return;

    // if user unauthorized
    if (userError && userError?.response?.status === 401) {
      // if page !== allowed_routes
      console.log('pathname', pathname);
      if (!allowedRoutes.includes(pathname)) {
        // => add ?redirect_to=/profile
        Router.push('/auth/login');
      }
    }

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
      if (!user.skills && !user.passions && currentIdentity?.type === 'users') {
        Router.push('/auth/onboarding');
      }
    }
  }, [
    user,
    pathname,
    userError,
    forceStop,
    mutateIdentities,
    mutateUser,
    currentIdentity?.type,
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
