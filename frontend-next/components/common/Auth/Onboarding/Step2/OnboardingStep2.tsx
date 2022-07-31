import { Button } from '@components/common';
import { StepProps } from '@models/stepProps';
const OnboardingStep2 = ({ onSubmit }: StepProps) => {

    const handleOnSubmit = (e:any)=>{
        e.preventDefault();
        onSubmit("true")
    }

    return (
        <form onSubmit={handleOnSubmit}className="flex flex-col justify-between  px-10    ">
            <div className="flex flex-col h-[28rem]">
                {' '}
                <h1 className="font-helmet text-center pt-16">Congratulations</h1>
                <p className="text-base text-center py-2 text-graySubtitle ">You’ve successfully created an account</p>
            </div>

            <div className="h-48  border-t-2 border-b-grayLineBased divide-x -mx-16 ">
                <Button
                    className="max-w-xs w-full  m-auto flex items-center justify-center align-middle mt-4 "
                    type="submit"
                    size="lg"
                    variant="fill"
                    value="Submit"
                >
                    Complete your profile
                </Button>
            </div>
        </form>
    );
};

export default OnboardingStep2;
