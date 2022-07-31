import { InputFiled, Button } from '@components/common';
import { useState, useMemo, useCallback } from 'react';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';
import { twMerge } from 'tailwind-merge';
import { rxHasNumber } from 'utils/regex';
import { StepProps } from '@models/stepProps';
import { useFormContext } from 'react-hook-form';
const ForgotPasswordStep3 = ({  onSubmit }: StepProps) => {
    const formMethods = useFormContext();
    const { handleSubmit, formState, register, watch } = formMethods;

    const [newPasswordShown, setNewPasswordShown] = useState<boolean>(false);

    const onToggleNewPassword = useCallback(() => {
        setNewPasswordShown((v) => !v);
    }, []);

    const newPassword = watch('newPassword');

    const isValidPasswordLength = useMemo<boolean>(() => newPassword && newPassword.length >= 7, [newPassword]);

    const isValidPasswordHasNumber = useMemo<boolean>(() => newPassword && rxHasNumber.test(newPassword), [
        newPassword,
    ]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-between   px-10    ">
            <div className="flex flex-col h-[28rem]">
                {' '}
                <h1 className="font-helmet">Reset your password </h1>
                <InputFiled
                    label="New password"
                    type={newPasswordShown ? 'text' : 'password'}
                    placeholder="New password"
                    register={register('newPassword')}
                    errorMessage={formState?.errors?.['newPassword']?.message}
                    required
                    className="my-6"
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
                    className="my-6"
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
            <div className="h-48  border-t-2 border-b-grayLineBased -mx-16  ">
                <Button
                    className="max-w-xs w-full  m-auto flex items-center justify-center align-middle mt-4 "
                    type="submit"
                    size="lg"
                    variant="fill"
                    value="Submit"
                    //disabled={!!formState?.errors}
                >
                    Change your password
                </Button>
            </div>
        </form>
    );
};

export default ForgotPasswordStep3;
