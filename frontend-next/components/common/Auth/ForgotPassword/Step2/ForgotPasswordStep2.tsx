import { useState, useRef } from 'react';
import { Button, TextInput } from '@components/common';

import Timer from '@components/common/Timer/Timer';
import { StepProps } from '@models/stepProps';
const ForgotPasswordStep2 = ({ onSubmit }: StepProps) => {
    const [code, setCode] = useState<any>([null, null, null, null, null, null]);

    const handleSubmitCheckCode = (e:any) => {
        e.preventDefault();
        onSubmit(code?.join(''));
    };
    const handleSubmitSendCode = (onClickReset: any) => {};

    const handleCodeInputChange = (e: any, codeIndex: number) => {
        setCode(
            code?.map((codeItem: any, indexCodeItem: number) =>
                indexCodeItem === codeIndex
                    ? e.target.value !== ''
                        ? Math.max(0, parseInt(e.target.value)).toString().slice(0, 1)
                        : null
                    : code[indexCodeItem],
            ),
        );

        codeIndex !== 3 && e.target.value !== '' && codeInputRef.current.children[codeIndex + 1].children[0].select();
    };

    const codeInputRef: any = useRef(null);
    return (
        <form onSubmit={handleSubmitCheckCode} className="flex flex-col justify-between px-10     ">
            <div className="flex flex-col h-[28rem]">
                {' '}
                <h1 className="font-helmet">Making sure it’s you</h1>
                <p className="text-base">
                    A message with a verification code has been sent to your email. Enter the code to continue.
                </p>
                <div className="codes flex flex-row  justify-center space-x-3 py-10" ref={codeInputRef}>
                    {[0, 1, 2, 3].map((codeIndex) => (
                        <TextInput
                            key={`opt-code-${codeIndex}`}
                            value={code[codeIndex]}
                            onChange={(e) => handleCodeInputChange(e, codeIndex)}
                            type="number"
                            maxLength={1}
                            className="text-center w-16 h-16 border-1 border-grayLineBased "
                        />
                    ))}
                </div>
            </div>

            <div className="h-48  border-t-2 border-b-grayLineBased  -mx-16 ">
                <Button
                    className="max-w-xs w-full  m-auto flex items-center justify-center align-middle mt-4 "
                    type="submit"
                    size="lg"
                    variant="fill"
                    value="Submit"
                    //disabled={!!formState[step]?.errors}
                >
                    Verify
                </Button>
                <div className="flex justify-center align-middle items-center">
                    <Timer>
                        {(onClickReset: any, disabled: any) => (
                            <div className="info flex">
                                <Button
                                    variant="link"
                                    size="lg"
                                    onClick={() => handleSubmitSendCode(onClickReset)}
                                    disabled={disabled}
                                >
                                    Resend the verification code
                                </Button>
                            </div>
                        )}
                    </Timer>
                </div>
            </div>
        </form>
    );
};

export default ForgotPasswordStep2;
