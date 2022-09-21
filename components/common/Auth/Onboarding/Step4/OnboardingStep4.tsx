import {SearchBar, Button, Chip} from '@components/common';
import {useState, useMemo, useCallback} from 'react';
import {StepProps} from '@models/stepProps';
import { useFormContext } from 'react-hook-form';
import useFilter from 'hooks/auth/useFilter';
import useHandleSelected from 'hooks/auth/useHandleSelected';

const OnboardingStep4 = ({onSubmit}: StepProps) => {
  const maxSkills = 10;
  const [selecteds, onSelect] = useHandleSelected("skills", maxSkills);
  
  const formMethods = useFormContext();
  const { watch, handleSubmit } = formMethods;

  const skills = useMemo(() => ["Sustainable Financse", "Bloomberg Taerminal", "Impact aInvesting", "Financaiald Analysis", "Sustainadbaility", "Sustainadble Finance","Sustainadbility", "Sustainablde Finance", "Bsloomberg Terminal", "Impact Investing", "Financial Analysis", "Sustainability"], [])
  const [filteredItems, filterWith] = useFilter(skills);

  const skill = watch('skills');
  
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-between px-10 grow sm:grow-1"
    >
      <div className="flex flex-col h-[28rem] ">
        {' '}
        <h1 className="font-helmet ">What skills do you have?</h1>
        <p className="text-base text-graySubtitle">
          Showcase up to 10 skills you can contribute to help social impact
          initiatives and organizations
        </p>
        <div className="flex flex-col bg-offWhite h-72  px-5 my-5 -mx-16">
          <SearchBar
            type="text"
            placeholder="Search"
            onChangeText={filterWith}
            className="my-6"
          />
          <div className="flex flex-col  border-t-2 border-b-grayLineBased -mx-5 px-5  ">
            <h3 className="py-3">Accounting & Consultancy</h3>
            <div className="flex flex-wrap space-x-2 h-32 overflow-y-auto ">
              {filteredItems.map((skill: any, index: number) => (
                <Chip
                  onSelected={onSelect}
                  selected={selecteds?.includes(skill+index)}
                  value={skill+index}
                  key={`skill-${skill+index}`}
                  content={skill+index}
                  contentClassName="text-secondary cursor-pointer "
                  containerClassName="bg-background my-2 h-8"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="sm:h-48  border-t-2 border-b-grayLineBased divide-x -mx-16 ">
        <Button
          className="max-w-xs w-full  m-auto flex items-center justify-center align-middle mt-4 "
          type="submit"
          size="lg"
          variant="fill"
          value="Submit"
          disabled={!(skill?.length === maxSkills)}
        >
          Continue
        </Button>
      </div>
    </form>
  );
};

export default OnboardingStep4;
