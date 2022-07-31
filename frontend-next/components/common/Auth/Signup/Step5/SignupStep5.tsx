import { Button } from '@components/common';
import Image from 'next/image';
import logoCompony from 'asset/icons/logo-color.svg';
import { useState } from 'react';
import { StepProps } from '@models/stepProps';
const SignupStep5 = ({ onSubmit }: StepProps) => {
    const [seePolicy, setSePolicy] = useState<boolean>(false);
    const handleSeePolicy = () => {
        setSePolicy(true);
    };
    const handleOnSubmit = (e:any)=>{
        e.preventDefault();
        onSubmit("true")
    }

    return (
        <form onSubmit={handleOnSubmit}className="flex flex-col justify-between px-10   ">
            <div className="flex flex-col h-[28rem]">
                <Image src={logoCompony} width="104.03" height="136.59" alt="socious logo" />

                <h1 className="font-helmet text-center my-6">Welcome to Socious</h1>
                <p className="text-base text-center my-6">
                    To continue, please agree to our
                    <Button variant="link" onClick={handleSeePolicy}>
                        {' '}
                        terms of service and privacy policy{' '}
                    </Button>
                </p>
            </div>
            <div className="h-48  border-t-2 border-b-grayLineBased divide-x -mx-16 ">
                <Button
                    className="max-w-xs w-full  m-auto flex items-center justify-center align-middle mt-4 "
                    type="submit"
                    size="lg"
                    variant="fill"
                    value="Submit"
                    disabled={!seePolicy}
                >
                    Continue
                </Button>
            </div>
        </form>
    );
};

export default SignupStep5;
