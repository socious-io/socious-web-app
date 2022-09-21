import {SearchBar, Button, Chip} from '@components/common';
import {useState} from 'react';
import {StepProps} from '@models/stepProps';
const OnboardingStep4 = ({onSubmit}: StepProps) => {
  const [selecteds, setSelecteds] = useState<any[]>([]);

  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    onSubmit('true');
  };

  const handleSelecteds = (itemSelected: any) => {
    selecteds?.includes(itemSelected)
      ? setSelecteds(selecteds?.filter((i) => i === itemSelected))
      : setSelecteds([...selecteds, itemSelected]);
  };

  return (
    <form
      onSubmit={handleOnSubmit}
      className="flex flex-col justify-between  px-10    "
    >
      <div className="flex h-[28rem] flex-col">
        {' '}
        <h1 className="font-helmet ">What skills do you have?</h1>
        <p className="text-base text-graySubtitle">
          Showcase up to 10 skills you can contribute to help social impact
          initiatives and organizations
        </p>
        <div className="my-5 -mx-16 flex h-72  flex-col bg-offWhite px-5">
          <SearchBar
            type="text"
            placeholder="Search"
            // register={register[step]("search")}
            className="my-6"
          />
          <div className="-mx-5 flex  flex-col border-t-2 border-b-grayLineBased px-5  ">
            <h3 className="py-3">Accounting & Consultancy</h3>
            <div className="flex h-32 flex-wrap  space-x-2 overflow-y-auto ">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((skill) => (
                <Chip
                  onSelected={handleSelecteds}
                  selected={selecteds?.includes(skill)}
                  value={skill}
                  key={`skill-${skill}`}
                  content="Bloomberg Terminal"
                  contentClassName="text-secondary cursor-pointer "
                  containerClassName="bg-background my-2 h-8"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="-mx-16  h-48 divide-x border-t-2 border-b-grayLineBased ">
        <Button
          className="m-auto mt-4  flex w-full max-w-xs items-center justify-center align-middle "
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

export default OnboardingStep4;
