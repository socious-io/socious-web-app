import {AxiosError} from 'axios';
import useSWR, {useSWRConfig} from 'swr';
import {useEffect} from 'react';
import Router, {useRouter} from 'next/router';

import {LoginIdentity} from './../../models/identity';
import {get} from 'utils/request';
import {logout} from '@api/auth/actions';
import {UserProfile} from '@models/profile';
import {IOrganization} from '@models/organization';

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

export type UserOrOrg = UserProfile | IOrganization | undefined;

export function useUser<T = any>(options?: UseUserOptions) {
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

  // TS goes insane if I try to set a type for user, thus this hack
  const profileRes = useSWR<any | null, AxiosError, string | null>(
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
  const {error: userError, mutate: mutateUser} = profileRes;
  const user: T = profileRes.data;

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
      // Router.push(`/app/auth/login?redirect_to=${pathname}`);
      console.log('redirect triggered in useUser');
    }

    // if user && error both are undefined
    if (!user && !userError) return;

    // if user authorized
    if (user && userError?.response?.status !== 401) {
      // if user has requested forgot password.
      if ((user as any).password_expired) {
        Router.push('/app/auth/forgotpassword');
        return;
      } else if (pathname.startsWith('/auth/forgotpassword')) {
        // if user trying to access /auth/forgotpassword when password not expired
        Router.push('/app');
      }
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
}

export default useUser;

declare global {
  interface Window {
    logout: () => any;
  }
}
