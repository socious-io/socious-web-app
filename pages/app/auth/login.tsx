import type {NextPage} from 'next';
import {useRouter} from 'next/router';
import Image from 'next/image';
import {useState, useCallback, useContext, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {joiResolver} from '@hookform/resolvers/joi';
import Link from 'next/link';
import {EyeIcon, EyeSlashIcon} from '@heroicons/react/24/outline';
import {AxiosError} from 'axios';
import {PreAuthLayout} from 'layout';

import {login} from '@api/auth/actions';
import {InputFiled, Button, Modal} from '@components/common';
import {schemaLogin} from '@api/auth/validation';

import logoCompony from 'asset/icons/logo-color.svg';
import typoCompony from 'asset/icons/typo-company.svg';
import {DefaultErrorMessage, ErrorMessage, get} from 'utils/request';
import {useUser} from '@hooks';

const Login: NextPage = () => {
  const router = useRouter();
  const {redirect_to} = router.query;
  const [passwordShown, setPasswordShown] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const {user, mutateIdentities} = useUser({redirect: false});

  const [errorMessage, setError] = useState<ErrorMessage>();

  const {register, handleSubmit, formState, getValues} = useForm({
    resolver: joiResolver(schemaLogin),
  });

  useEffect(() => {
    if (user) {
      if (!user.skills?.length && !user.social_causes?.length)
        router.push('/app/auth/onboarding');
      else if (redirect_to) router.push(redirect_to as string);
      else router.push('/app');
    }
  }, [user, redirect_to, router]);

  const onSubmit = (data: any) => {
    handleLoginRequest();
  };

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };
  const handleLoginRequest = async () => {
    const email = getValues('email');
    const password = getValues('password');
    try {
      await login(email, password);
    } catch (e) {
      const error = e as AxiosError<any>;
      let msg = DefaultErrorMessage;
      if (error.isAxiosError) {
        if (error.response?.data?.error === 'Not matched')
          msg = {
            title: 'Invalid login',
            message: 'Email or password is incorrect',
          };
      }
      setError(msg);
      setShowModal(!showModal);
      return;
    }
    await mutateIdentities();
  };

  const onTogglePassword = useCallback(() => {
    setPasswordShown((v) => !v);
  }, []);

  return (
    <PreAuthLayout>
      <div className="mx-auto flex min-h-screen w-screen flex-col items-stretch border border-grayLineBased bg-background px-6 sm:h-[45rem] sm:min-h-0 sm:max-w-xl sm:rounded-3xl">
        <div className="relative flex h-36 justify-center">
          <span className="mx-auto py-16">
            <Image
              src={logoCompony}
              width="18.86"
              height="20.51"
              alt="socious logo"
            />
            <Image
              src={typoCompony}
              width="113"
              height="23.18"
              alt="socious logo"
            />
          </span>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex grow flex-col justify-between pl-0 pr-10 sm:grow-0 sm:pl-10"
        >
          <div className="flex grow flex-col pb-14 sm:max-h-[28rem]">
            {' '}
            <h1 className="font-helmet">Sign in</h1>
            <InputFiled
              label="Email"
              type="email"
              placeholder="Email"
              register={register('email')}
              errorMessage={formState?.errors?.['email']?.message}
              required
              className="my-6"
            />
            <div className="relative">
              <InputFiled
                label="Password"
                type={passwordShown ? 'text' : 'password'}
                placeholder="Password"
                register={register('password')}
                errorMessage={formState?.errors?.['password']?.message}
                required
                className="my-6"
                suffixContent={
                  passwordShown ? (
                    <span onClick={onTogglePassword}>
                      <EyeIcon className="h-5 w-5 cursor-pointer" />
                    </span>
                  ) : (
                    <span onClick={onTogglePassword}>
                      <EyeSlashIcon className="h-5 w-5 cursor-pointer" />
                    </span>
                  )
                }
              />

              <Link passHref href="/app/auth/forgotpassword">
                <Button
                  className="absolute -right-6 -bottom-5"
                  size="lg"
                  variant="link"
                >
                  Forgot your password?
                </Button>
              </Link>
            </div>
          </div>

          <div className="-mx-16 divide-x border-t-2 border-b-grayLineBased pb-12 pl-10 sm:pl-0">
            <Button
              className="m-auto mt-4  flex w-full max-w-xs items-center justify-center align-middle"
              type="submit"
              size="lg"
              variant="fill"
              value="Submit"
            >
              Continue
            </Button>
            <div className="flex items-center justify-center align-middle">
              Not a member?
              <Link passHref href="/app/auth/signup">
                <Button size="lg" variant="link">
                  Sign up
                </Button>
              </Link>
            </div>
          </div>
        </form>

        <Modal isOpen={showModal} onClose={handleToggleModal}>
          <Modal.Title>
            <h2 className="text-center text-error">{errorMessage?.title}</h2>
          </Modal.Title>
          <Modal.Description>
            <div className="mt-2">
              <p className="text-sm text-gray-500">{errorMessage?.message}</p>
            </div>
          </Modal.Description>
          <div className="mt-4">
            <Button
              className="m-auto mt-4  flex w-full max-w-xs items-center justify-center align-middle "
              type="submit"
              size="lg"
              variant="fill"
              value="Submit"
              onClick={handleToggleModal}
            >
              Close
            </Button>
          </div>
        </Modal>
      </div>
    </PreAuthLayout>
  );
};

export default Login;
