import { Button } from '@components/common';
import Combobox from '@components/common/Combobox/Combobox';
import { StepProps } from '@models/stepProps';
import { useFormContext } from 'react-hook-form';
const OnboardingStep5 = ({  onSubmit }: StepProps) => {

    const formMethods = useFormContext();

    const { handleSubmit, formState, setValue, getValues } = formMethods;
    const handleSetCountry = (data: any) => {
        setValue('country', data, {
            shouldValidate: true,
            shouldDirty: true,
        });
    };
    const handleSetCity = (data: any) => {
        setValue('city', data, {
            shouldValidate: true,
            shouldDirty: true,
        });
    };
    const items = [
        { id: 1, name: 'Test1' },
        { id: 2, name: 'Test2' },
        { id: 3, name: 'Test3' },
        { id: 4, name: 'Test4' },
        { id: 5, name: 'Test5' },
        { id: 6, name: 'Test6' },
    ];

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-between  px-10    ">
            <div className="flex flex-col h-[28rem]">
                {' '}
                <h1 className="font-helmet  ">What’s your location?</h1>
                <p className="text-base text-graySubtitle">Connect with other like-minded individuals and organizations around you</p>
                <Combobox
                    label="Country"
                    selected={getValues('country')}
                    onSelected={handleSetCountry}
                    required
                    name="country"
                    items={items}
                    placeholder="Country"
                    errorMessage={formState?.errors?.['country']?.message}
                    className="my-6"
                />
                <Combobox
                    label="City"
                    selected={getValues('city')}
                    onSelected={handleSetCity}
                    required
                    name="city"
                    items={items}
                    placeholder="City"
                    errorMessage={formState?.errors?.['city']?.message}
                    className="my-6"
                />
            </div>

            <div className="h-48  border-t-2 border-b-grayLineBased divide-x -mx-16 ">
                <Button
                    className="max-w-xs w-full  m-auto flex items-center justify-center align-middle mt-4 "
                    type="submit"
                    size="lg"
                    variant="fill"
                    value="Submit"
                >
                    Continue
                </Button>
            </div>
        </form>
    );
};

export default OnboardingStep5;
