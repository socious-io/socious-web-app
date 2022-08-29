import type {NextPage} from 'next';
import Router from 'next/router';
import Image from 'next/image';
import {useState, useCallback, useContext} from 'react';
import {useForm} from 'react-hook-form';
import {joiResolver} from '@hookform/resolvers/joi';
import Link from 'next/link';
import {InputFiled, Button, Modal} from '@components/common';

import { login } from "../../api/auth/actions";
import { FetchError } from 'utils/request';

import {EyeIcon, EyeOffIcon} from '@heroicons/react/outline';

import logoCompony from 'asset/icons/logo-color.svg';
import typoCompony from 'asset/icons/typo-company.svg';
import {schemaLogin} from '@api/auth/validation';


const Login: NextPage = () => {

  const [passwordShown, setPasswordShown] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const [errorMessage, setError] = useState<string>('');

  const {register, handleSubmit, formState, getValues} = useForm({
    resolver: joiResolver(schemaLogin),
  });


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
      Router.push("/");
    } catch (error: any) {
      if (error instanceof FetchError) {
        setError(() => (error.data.error || error.data.message));
      }
      setShowModal(!showModal);
    }
  };

  const onTogglePassword = useCallback(() => {
    setPasswordShown((v) => !v);
  }, []);

  return (
    <div className="max-w-xl h-[45rem]  mx-auto bg-background rounded-3xl pb-7 px-6 border border-grayLineBased ">
      <div className="flex  justify-center  h-36 relative">
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
        className="flex flex-col justify-between  px-10     "
      >
        <div className="flex flex-col h-[28rem]">
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
                    <EyeIcon className="w-5 h-5 cursor-pointer" />
                  </span>
                ) : (
                  <span onClick={onTogglePassword}>
                    <EyeOffIcon className="w-5 h-5 cursor-pointer" />
                  </span>
                )
              }
            />

            <Link passHref href="/auth/forgotpassword">
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

        <div className="h-48  border-t-2 border-b-grayLineBased -mx-16  ">
          <Button
            className="max-w-xs w-full  m-auto flex items-center justify-center align-middle mt-4 "
            type="submit"
            size="lg"
            variant="fill"
            value="Submit"
          >
            Continue
          </Button>
          <div className="flex justify-center align-middle items-center">
            Not a member?
            <Link passHref href="/auth/signup">
              <Button size="lg" variant="link">
                Sign up
              </Button>
            </Link>
          </div>
        </div>
      </form>

      <Modal isOpen={showModal} onClose={handleToggleModal}>
        <Modal.Title>
          <h2 className="text-error text-center">{errorMessage || "Sorry, something went wrong"}</h2>
        </Modal.Title>
        <Modal.Description>
          <div className="mt-2">
            <p className="text-sm text-gray-500">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit de. </p>
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
          >
            Close
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Login;
