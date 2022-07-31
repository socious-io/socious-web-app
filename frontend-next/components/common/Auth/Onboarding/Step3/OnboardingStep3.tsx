import { SearchBar, Button, Chip } from '@components/common';
import { useState } from 'react';
import { StepProps } from '@models/stepProps';
const OnboardingStep3 = ({ onSubmit }: StepProps) => {
    const [selecteds, setSelecteds] = useState<any[]>([]);
    const handleSelecteds = (itemSelected: any) => {
        selecteds?.includes(itemSelected)
            ? setSelecteds(selecteds?.filter((i) => i === itemSelected))
            : setSelecteds([...selecteds, itemSelected]);
    };
    return (
        <form onSubmit={onSubmit}className="flex flex-col justify-between  px-10    ">
            <div className="flex flex-col h-[28rem]">
                {' '}
                <h1 className="font-helmet ">What are your social causes?</h1>
                <p className="text-base text-graySubtitle ">Select up to 5 social causes that you are passionate about</p>
                <div className="flex flex-col bg-offWhite h-72  px-5 my-5 -mx-16">
                    <SearchBar
                        type="text"
                        placeholder="Search"
                        // register={register[step]("search")}
                        className="my-6"
                    />
                    <div className="flex flex-col  border-t-2 border-b-grayLineBased -mx-5 px-5  ">
                        <h3 className="py-3">Popular</h3>
                        <div className="flex flex-wrap space-x-2 h-32 overflow-y-auto   ">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((skill) => (
                                <Chip
                                    onSelected={handleSelecteds}
                                    selected={selecteds?.includes(skill)}
                                    value={skill}
                                    key={`skill-${skill}`}
                                    content="Inequality"
                                    contentClassName="text-secondary cursor-pointer"
                                    containerClassName="bg-background my-2  h-8"
                                />
                            ))}
                        </div>
                    </div>
                </div>
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

export default OnboardingStep3;
