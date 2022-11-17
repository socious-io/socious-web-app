import type {NextPage} from 'next';
import {useRouter} from 'next/router';
import Image from 'next/image';
import {useState, useCallback} from 'react';
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
import {DefaultErrorMessage, ErrorMessage} from 'utils/request';
import {useUser} from '@hooks';
import {
  addNotificationReceivedListener,
  getDeliveredNotifications,
  getToken,
  requestPermissions,
  subscribeToTopic,
} from 'core/pushNotification';
import {getDevices, saveDeviceToken} from '@api/devices/actions';
import {DeviceBody} from '@models/devices';

type Account = {
  email: string;
  password: string;
};

export type LoginResp = {
  message?: 'success';
  error?: 'Not matched';
};

const Login: NextPage = () => {
  const router = useRouter();
  const [passwordShown, setPasswordShown] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const {mutateIdentities} = useUser({redirect: false});

  const [errorMessage, setError] = useState<ErrorMessage>();

  const {register, handleSubmit, formState, getValues} = useForm({
    resolver: joiResolver(schemaLogin),
  });

  const getFCMToken = async (
    response: Awaited<ReturnType<typeof requestPermissions>>,
  ): Promise<string> => {
    if (response !== 'granted') {
      console.log('User did not grant permission to use push notification');
      throw Error;
    }

    return getToken().catch((e: Error) => {
      console.log('error accrued during retrieving token', e);
      return '';
    });
  };

  const saveToken = async (token: string) => {
    console.log('FCMToken: ', token);
    if (!token) {
      return;
    }

    const list = await getDevices().catch((err) => {
      console.log('error on getting list of devices', err);
      return [];
    });
    console.log('list: ', list);
    const savedToken = list.find(({id}) => id === token);

    console.log('savedToken: ', savedToken);

    if (savedToken) {
      return savedToken;
    }

    const device: DeviceBody = {
      token,
      meta: {
        os: 'IOS',
      },
    };
    const resp = await saveDeviceToken(device).catch((err) => {
      console.log('error saving token to the db: ', err);
      return {token: ''};
    });
    console.log('saveDeviceToken: ', resp);
    return resp.token;
  };

  const addListeners = () => {
    console.log('addListeners');
    addNotificationReceivedListener().then((n) =>
      console.log('addNotificationReceivedListener: ', n),
    );
    getDeliveredNotifications().then((r) =>
      console.log('getDeliveredNotifications', r),
    );
  };

  const onLoginSucceed = async ({message}: LoginResp) => {
    if (message === 'success') {
      // const alreadyGranted = (await checkPermissions()) === 'granted';

      // if (alreadyGranted) {
      //   router.push('/app/projects');
      //   return;
      // }

      requestPermissions()
        .then(getFCMToken)
        .then(saveToken)
        .then(addListeners)
        .catch((err) => {
          console.log('err during permission request ', err);
        });
      router.push('/app/projects');
    }
  };

  const onLoginError = (e: Error) => {
    console.log('onLoginError: ', e);
  };

  const onSubmit = () => {
    const email = getValues('email');
    const password = getValues('password');
    login(email, password)
      .then(onLoginSucceed)
      .catch(onLoginError)
      .finally(mutateIdentities);
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
