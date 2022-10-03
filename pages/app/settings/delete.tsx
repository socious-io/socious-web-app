/* eslint-disable react/no-unescaped-entities */
/* eslint-disable prettier/prettier */
import {deletePost} from '@api/posts/actions';
import {ChevronLeftIcon,EyeIcon, EyeSlashIcon} from '@heroicons/react/24/outline';
import {ModalProps, Modal, Button,InputFiled} from '@components/common';
import Image from 'next/image';
import LogoVertical from 'asset/images/LogoVertical.svg';
import {useCallback, useState} from 'react';
import Router from 'next/router';
import {AxiosError} from 'axios';
import {deleteAccount} from '@api/auth/actions';
import {DefaultErrorMessage, ErrorMessage} from 'utils/request';
interface DeleteModalProps extends ModalProps {
  pid: string;
}

const DeleteModal = ({
  isOpen = true,
  onClose = () => null,
  pid,
}: DeleteModalProps) => {
const [model1, setModel1] = useState(true);
const [model2, setModel2] = useState(false);
const [model3, setModel3] = useState(false);
const [password,setPassword] = useState('');
const [newPasswordShown, setNewPasswordShown] = useState<boolean>(false);
const [errorMessage, setError] = useState<ErrorMessage | null>();

  const onDelete = useCallback(async () => {
    try {
      await deletePost(pid);
      console.log('Deleted');
      Router.push('/');
    } catch (error) {
      console.error(error);
    }
  }, [pid]);
  
  const onContinue = () => {
    setModel2(true);
    setModel1(false);
    setModel3(false);
  }

// const handleBack = useCallback(() => {
//     setStep(step - 1);
//   }, [step]);
const handleBack = () => {
  Router.push('/app');
}

  const handleCancel = () => {
    setModel2(false);
    setModel1(true);
    setModel3(false);
  }
  const onCancel = () => {
    setModel2(false);
    setModel1(false);
    setModel3(false);
    Router.push('/app');
  }
  const handleAccountDeleted = async () => {
    let reason = 'Delete my account'
// "https://dev.socious.io/api/v2/user/delete"

try {
  if(password){
    await deleteAccount(reason);
    // setModel2(false);
    // setModel1(false);
    // setModel3(true);
  }
  } catch (e) {
    console.log("Error e ==== ", e);
    // const error = e as AxiosError<any>;
    // let msg = DefaultErrorMessage;
    // if (error.isAxiosError) {
    //   if (error.response?.data?.error === 'Not matched')
    //     msg = {
    //       title: 'Invalid Password',
    //       message: 'Password is incorrect.',
    //     };
    // }
    // setError(msg);
  }  
    setModel2(false);
    setModel1(false);
    setModel3(true);  
  }

  const handlePassword = (e:any) => {
    setPassword(e.target.value);
  }
  const onToggleNewPassword = useCallback(() => {
    setNewPasswordShown((v) => !v);
  }, []);

  return (
<>
<Modal isOpen={model1} className="h-h-812 w-w-375 rounded-none flex flex-col justify-between" onClose={onClose}>
     <div className='m-2'>
     <div className="absolute left-5 top-5 cursor-pointer" title="Back" onClick={handleBack}>
              <ChevronLeftIcon className="h-5 w-5 cursor-pointer" />
      </div>
      <Modal.Description>
        <div className="mt-5">
          <p className="text-start ht-5 font-semibold ">
            Are you sure ?
          </p>
          <p className='mt-2 text-sm text-base font-normal'>
            Deleting your account will erase all your existing activity on Socious, including connections you've, made, and projects you've contributed to.
          </p>
          <p className='mt-5 text-sm text-base font-normal'>
            This action is irreversible.
          </p>
        </div>
      </Modal.Description>
     </div>
      <div className="mt-7 space-y-2 ">       
        <Button
          className="mx-auto block w-full max-w-full align-middle font-semibold"
          type="submit"
          variant="outline"
          onClick={onContinue}
        >
          Continue
        </Button>
        <Button
          className="mx-auto block w-full max-w-full align-middle font-semibold"
          type="submit"
          variant="outline"
          // onClick={handleSureDeleteMyAccount}
          onClick={onCancel}
        >
          Cancel
        </Button>
      </div>
</Modal>
<Modal isOpen={model2} className="h-h-812 w-w-375 rounded-none flex flex-col justify-between" onClose={onClose}>
    <div className='m-2'>
    <div className="absolute left-5 top-5 cursor-pointer" title="Back" onClick={handleBack}>
              <ChevronLeftIcon className="h-5 w-5 cursor-pointer" />
      </div>
      <Modal.Description>
        <div className="mt-2">
          <p className="text-start ht-5 font-semibold">
            Delete Account
          </p>
          <p className='mt-5 mb-5 text-sm text-base font-normal'>
            Please enter your Password to delete account.
          </p>

          <InputFiled
          label="Enter password"
          type={newPasswordShown ? 'text' : 'password'}
          placeholder="Enter password"
          // errorMessage={formState?.errors?.['newPassword']?.message}
          required
          className="my-2"
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
          autoComplete="on"
          onChange={(e)=>handlePassword(e)}
        />
        </div>
      </Modal.Description>
      </div>
      <div className="mt-7 space-y-2">
        <Button
          className="mx-auto block w-full max-w-full align-middle font-semibold"
          type="submit"
          variant="outline"
          onClick={handleAccountDeleted}
        >
          Delete my Account
        </Button>
        <Button
          className="mx-auto block w-full max-w-full align-middle font-semibold"
          type="submit"
          variant="outline"
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </div>
</Modal>
<Modal isOpen={model3} className="h-h-812 w-w-375 rounded-none flex flex-col justify-center" onClose={onClose}>
<div className='m-2'>
<div className="absolute left-5 top-5 cursor-pointer" title="Back" onClick={handleBack}>
              
      </div>
      <Modal.Description>
        <div className="mt-2 flex flex-col justify-center">
        <Image
        className='text-center ht-5 font-extrabold'
          src={LogoVertical}
          width="104.03"
          height="136.59"
          alt="socious logo"
        />
         <div className='mt-5 mb-5'>
         <p className='mt-2 text-sm text-base font-semibold text-primary'>
           Your account has been deleted.
          </p>
          <p className='mt-2 text-sm text-base font-normal'>
           You will get confirmation email at: user@email.com
          </p>
         </div>
        </div>
      </Modal.Description>
      </div>
      <div className="mt-7 space-y-2">
         {/* <Button
          className="mx-auto block w-full max-w-full align-middle font-semibold"
          variant="fill"
          onClick={onDelete}
        >
          Delete
        </Button> */}
        {/* <Button
          className="mx-auto block w-full max-w-full align-middle font-semibold"
          type="submit"
          variant="outline"
          onClick={onClose}
        >
          Cancel
        </Button> */}
        {/* <Button
          className="mx-auto block w-full max-w-full align-middle font-semibold"
          variant="fill"
          onClick={onDelete}
        >
          Delete
        </Button> */}
        {/* <Button
          className="mx-auto block w-full max-w-full align-middle font-semibold"
          type="submit"
          variant="outline"
          onClick={onClose}
        >
          Cancel
        </Button> */}
        <Button
          className="mx-auto block w-full max-w-full align-middle font-semibold"
          type="submit"
          variant="outline"
          onClick={onCancel}
        >
          Join Now
        </Button>
      </div>
</Modal>
</>
  );
};

export default DeleteModal;
