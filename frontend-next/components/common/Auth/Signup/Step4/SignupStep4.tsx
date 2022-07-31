import { Button } from '@components/common';
import { useState } from 'react';
import { StepProps } from '@models/stepProps';
const SignupStep4 = ({ onSubmit }: StepProps) => {
    const [seeConditions, setSeeConditions] = useState<boolean>(false);
    const handleSeeConditions = () => {
        setSeeConditions(true);
    };
    return (
        <form onSubmit={onSubmit}className="flex flex-col justify-between px-10   ">
            <div className="flex flex-col h-[28rem]">
                <h1 className="font-helmet">Review our policy</h1>
                <p className="text-base flex flex-wrap my-6">
                    Some rules are in place to help maintain a friendly and collaborative marketplace, please review our
                    <Button variant="link" onClick={handleSeeConditions}>
                        terms & conditions
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
                    disabled={!seeConditions}
                >
                    Continue
                </Button>
            </div>
        </form>
    );
};

export default SignupStep4;
