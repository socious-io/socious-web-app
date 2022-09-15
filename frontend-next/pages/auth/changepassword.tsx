import type {NextPage} from 'next';
import Router from 'next/router';
import {useState, useMemo, useCallback} from 'react';
import {useForm} from 'react-hook-form';
import {joiResolver} from '@hookform/resolvers/joi';
import {InputFiled, Button, Modal} from '@components/common';
import {rxHasNumber} from 'utils/regex';
import {twMerge} from 'tailwind-merge';
import {AxiosError} from 'axios';

import {EyeIcon, EyeOffIcon, ChevronLeftIcon} from '@heroicons/react/outline';
import {schemaChangePassword} from '../../api/auth/validation';
import {changePassword} from '@api/auth/actions';
import {DefaultErrorMessage, ErrorMessage} from 'utils/request';

const ChangePassword: NextPage = () => {
  const [passwordShown, setPasswordShown] = useState<boolean>(false);
  const [newPasswordShown, setNewPasswordShown] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [errorMessage, setError] = useState<ErrorMessage>();

  const {register, handleSubmit, formState, watch, getValues} = useForm({
    resolver: joiResolver(schemaChangePassword),
  });

  const onSubmit = (data: any) => {
    handleChangePasswordRequest();
  };

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const onTogglePassword = useCallback(() => {
    setPasswordShown((v) => !v);
  }, []);

  const onToggleNewPassword = useCallback(() => {
    setNewPasswordShown((v) => !v);
  }, []);

  const handleBack = () => {};

  const handleChangePasswordRequest = async () => {
    const currentPassword = getValues('currentPassword');
    const newPassword = getValues('newPassword');

    try {
      await changePassword(currentPassword, newPassword);
      Router.push('/');
    } catch (e) {
      const error = e as AxiosError;
      let msg = DefaultErrorMessage;
      if (error.isAxiosError) {
        if (error.response?.data?.error === 'Not matched')
          msg = {
            title: 'Invalid Password',
            message: 'Password is incorrect.',
          };
      }
      setError(msg);
      handleToggleModal();
    }
  };

  const newPassword = watch('newPassword');

  const isValidPasswordLength = useMemo<boolean>(
    () => newPassword && newPassword.length >= 7,
    [newPassword],
  );

  const isValidPasswordHasNumber = useMemo<boolean>(
    () => newPassword && rxHasNumber.test(newPassword),
    [newPassword],
  );

  return (
    <div className="max-w-xl h-[45rem] m-auto bg-background rounded-3xl py-7 px-6 border border-grayLineBased ">
      <div className="flex  justify-center  h-20 relative">
        <span
          className="cursor-pointer absolute left-0"
          title="Back"
          onClick={handleBack}
        >
          <ChevronLeftIcon className="w-5 h-5 cursor-pointer" />
        </span>

        <div className="flex h-20 pt-1">
          <h1 className="font-helmet">Change password</h1>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-between  px-10   "
      >
        <div className="flex flex-col h-[28rem]">
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
                  <EyeIcon className="w-5 h-5 cursor-pointer" />
                </span>
              ) : (
                <span onClick={onTogglePassword}>
                  <EyeOffIcon className="w-5 h-5 cursor-pointer" />
                </span>
              )
            }
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
                  <EyeIcon className="w-5 h-5 cursor-pointer" />
                </span>
              ) : (
                <span onClick={onToggleNewPassword}>
                  <EyeOffIcon className="w-5 h-5 cursor-pointer" />
                </span>
              )
            }
          />
          <InputFiled
            label="Confirm new password"
            type="password"
            placeholder="Confirm new password"
            register={register('confirmNewPassword')}
            errorMessage={formState?.errors?.['confirmNewPassword']?.message}
            required
            className="pb-6"
          />
          <div className="grid grid-cols-2 gap-3  py-5 w-full">
            <div
              className={twMerge(
                'flex flex-col  border-t-4 py-3 border-t-success',
                !isValidPasswordLength && 'border-opacity-40',
              )}
            >
              <p className="text-sm">・7 characters </p>
            </div>
            <div
              className={twMerge(
                'flex flex-col border-t-4 py-3 border-t-success',
                !isValidPasswordHasNumber && 'border-opacity-40',
              )}
            >
              <p className="text-sm">・1 number </p>
            </div>
          </div>
        </div>

        <div className="h-48  border-t-2 border-b-grayLineBased  -mx-16 ">
          <Button
            className="max-w-xs w-full  m-auto flex items-center justify-center align-middle mt-4 "
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

      <Modal isOpen={showModal} onClose={handleToggleModal}>
        <Modal.Title>
          <h2 className="text-error text-center">{errorMessage?.title}</h2>
        </Modal.Title>
        <Modal.Description>
          <div className="mt-2">
            <p className="text-sm text-gray-500">{errorMessage?.message}</p>
          </div>
        </Modal.Description>
        <div className="mt-4">
          <Button
            className="max-w-xs w-full  m-auto flex items-center justify-center align-middle mt-4 "
            type="submit"
            size="lg"
            variant="fill"
            value="Submit"
            onClick={handleToggleModal}
            //disabled={!!formState?.errors}
          >
            Close
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ChangePassword;
