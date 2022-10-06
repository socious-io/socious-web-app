import type {NextPage} from 'next';
import {useRouter} from 'next/router';
import {useState, useMemo, useCallback} from 'react';
import {useForm} from 'react-hook-form';
import {joiResolver} from '@hookform/resolvers/joi';
import {InputFiled, Button, Modal} from '@components/common';
import {rxHasLowerCase, rxHasNumber, rxHasUpperCase} from 'utils/regex';
import {twMerge} from 'tailwind-merge';
import {AxiosError} from 'axios';

import {
  EyeIcon,
  EyeSlashIcon,
  ChevronLeftIcon,
} from '@heroicons/react/24/outline';
import {schemaChangePassword} from '@api/auth/validation';
import {changePassword} from '@api/auth/actions';
import {DefaultErrorMessage, ErrorMessage} from 'utils/request';
import {PreAuthLayout} from 'layout';

const ChangePassword: NextPage = () => {
  const router = useRouter();
  const [passwordShown, setPasswordShown] = useState<boolean>(false);
  const [newPasswordShown, setNewPasswordShown] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [errorMessage, setError] = useState<ErrorMessage | null>();

  const {register, handleSubmit, formState, watch, getValues} = useForm({
    resolver: joiResolver(schemaChangePassword),
  });

  const onSubmit = (data: any) => {
    handleChangePasswordRequest();
  };

  const onModalClose = useCallback(() => {
    if (errorMessage) {
      setError(null);
    } else {
      router.push('/app');
    }
    setShowModal(false);
  }, [errorMessage, router]);

  const onTogglePassword = useCallback(() => {
    setPasswordShown((v) => !v);
  }, []);

  const onToggleNewPassword = useCallback(() => {
    setNewPasswordShown((v) => !v);
  }, []);

  const handleChangePasswordRequest = useCallback(async () => {
    const currentPassword = getValues('currentPassword');
    const newPassword = getValues('newPassword');

    try {
      await changePassword(currentPassword, newPassword);
    } catch (e) {
      const error = e as AxiosError<any>;
      let msg = DefaultErrorMessage;
      if (error.isAxiosError) {
        if (error.response?.data?.error === 'Not matched')
          msg = {
            title: 'Invalid Password',
            message: 'Password is incorrect.',
          };
      }
      setError(msg);
    }
    setShowModal(true);
  }, [getValues]);

  const newPassword = watch('newPassword');

  const isValidPasswordLength = useMemo<boolean>(
    () => newPassword && newPassword.length >= 8,
    [newPassword],
  );

  const isValidPasswordHasNumber = useMemo<boolean>(
    () => newPassword && rxHasNumber.test(newPassword),
    [newPassword],
  );

  const isValidPasswordHasUpCase = useMemo<boolean>(
    () => newPassword && rxHasUpperCase.test(newPassword),
    [newPassword],
  );

  const isValidPasswordHasLowCase = useMemo<boolean>(
    () => newPassword && rxHasLowerCase.test(newPassword),
    [newPassword],
  );

  return (
    <PreAuthLayout>
      <div className="mx-auto flex min-h-screen w-screen flex-col items-stretch border border-grayLineBased bg-background px-6 pt-12 sm:my-auto sm:h-[45rem] sm:min-h-0 sm:max-w-xl sm:rounded-3xl sm:pt-7">
        <div className="relative  flex  h-20 justify-center">
          <span
            className="absolute left-0 top-3 cursor-pointer"
            title="Back"
            onClick={() => router.back()}
          >
            <ChevronLeftIcon className="h-5 w-5 cursor-pointer" />
          </span>

          <div className="flex h-20 pt-1">
            <h1 className="font-helmet">Change password</h1>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex grow flex-col justify-between pl-0 pr-10 sm:grow-0 sm:pl-10"
        >
          <div className="flex h-[28rem] flex-col">
            <InputFiled
              label="Current password"
              type={passwordShown ? 'text' : 'password'}
              placeholder="Current password"
              register={register('currentPassword')}
              errorMessage={formState?.errors?.['currentPassword']?.message}
              required
              className="pb-6"
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
              inputType="borderBottom"
            />
            <InputFiled
              label="New password"
              type={newPasswordShown ? 'text' : 'password'}
              placeholder="New password"
              register={register('newPassword')}
              errorMessage={formState?.errors?.['newPassword']?.message}
              required
              className="pb-6"
              suffixContent={
                newPasswordShown ? (
                  <span onClick={onToggleNewPassword}>
                    <EyeIcon className="h-5 w-5 cursor-pointer" />
                  </span>
                ) : (
                  <span onClick={onToggleNewPassword}>
                    <EyeSlashIcon className="h-5 w-5 cursor-pointer" />
                  </span>
                )
              }
              inputType="borderBottom"
            />
            <InputFiled
              label="Confirm new password"
              type="password"
              placeholder="Confirm new password"
              register={register('confirmNewPassword')}
              errorMessage={formState?.errors?.['confirmNewPassword']?.message}
              required
              className="pb-6"
              inputType="borderBottom"
            />
            <div className="grid w-full grid-cols-4  gap-3 py-5 sm:py-3 md:py-5 2xl:py-3">
              <div
                className={twMerge(
                  'flex flex-col  border-t-4 border-t-success py-3',
                  !isValidPasswordLength && 'border-opacity-40',
                )}
              >
                <p className="text-sm">・8 characters </p>
              </div>
              <div
                className={twMerge(
                  'flex flex-col border-t-4 border-t-success py-3',
                  !isValidPasswordHasNumber && 'border-opacity-40',
                )}
              >
                <p className="text-sm">・1 number </p>
              </div>
              <div
                className={twMerge(
                  'flex flex-col  border-t-4 border-t-success py-3',
                  !isValidPasswordHasUpCase && 'border-opacity-40',
                )}
              >
                <p className="text-sm">・1 uppercase </p>
              </div>
              <div
                className={twMerge(
                  'flex flex-col border-t-4 border-t-success py-3',
                  !isValidPasswordHasLowCase && 'border-opacity-40',
                )}
              >
                <p className="text-sm">・1 lowercase </p>
              </div>
            </div>
          </div>

          <div className="-mx-16 border-t-2 border-b-grayLineBased pb-12 pl-10 sm:h-48  sm:pl-0 ">
            <Button
              className="m-auto mt-4  flex w-full max-w-xs items-center justify-center align-middle "
              type="submit"
              size="lg"
              variant="fill"
              value="Submit"
              // disabled={!!formState?.errors}
            >
              Change your password
            </Button>
          </div>
        </form>

        <Modal isOpen={showModal} onClose={onModalClose}>
          {errorMessage && (
            <Modal.Title>
              <h2 className="text-center text-error">{errorMessage.title}</h2>
            </Modal.Title>
          )}
          <Modal.Description>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                {errorMessage
                  ? errorMessage.message
                  : 'You have successfully changed your password.'}
              </p>
            </div>
          </Modal.Description>
          <div className="mt-4">
            <Button
              className="m-auto mt-4  flex w-full max-w-xs items-center justify-center align-middle "
              type="submit"
              size="lg"
              variant="fill"
              value="Submit"
              onClick={onModalClose}
              //disabled={!!formState?.errors}
            >
              {errorMessage ? 'Close' : 'Ok'}
            </Button>
          </div>
        </Modal>
      </div>
    </PreAuthLayout>
  );
};

export default ChangePassword;
