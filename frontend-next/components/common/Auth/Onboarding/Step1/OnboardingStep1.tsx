import { Button } from '@components/common';
import Image from 'next/image';
import { useState } from 'react';
import logoCompony from 'asset/icons/logo-color.svg';
import { StepProps } from '@models/stepProps';
const   OnboardingStep1 = ({ onSubmit }: StepProps) => {
    const [seePolicy, setSePolicy] = useState<boolean>(false);
    const handleSeePolicy = () => {
        setSePolicy(true);
    };
    return (
        <form onSubmit={onSubmit}className="flex flex-col justify-between  px-10    ">
            <div className="flex flex-col h-[28rem]">
                {' '}
                <Image src={logoCompony} width="104.03" height="136.59" alt="socious logo" />
                <h1 className="font-helmet text-center my-6 ">Welcome to Socious</h1>
                <p className="text-base text-center my-6 text-graySubtitle">
                    To continue, please agree to our terms of service and privacy policy
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
                    I agree
                </Button>
            </div>
        </form>
    );
};

export default OnboardingStep1;
