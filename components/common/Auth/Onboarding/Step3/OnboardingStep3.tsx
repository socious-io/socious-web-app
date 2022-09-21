import {SearchBar, Button, Chip} from '@components/common';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {StepProps} from '@models/stepProps';
import { useFormContext } from 'react-hook-form';
import useFilter from 'hooks/auth/useFilter';
import useHandleSelected from 'hooks/auth/useHandleSelected';

const OnboardingStep3 = ({onSubmit}: StepProps) => {
  const maxCauses = 5;
  const [selecteds, onSelect] = useHandleSelected("passions", maxCauses);

  const formMethods = useFormContext();
  const {handleSubmit, watch} = formMethods;

  const passions = useMemo(() => ["inequilty", "Mental Health", "Neurodiversity", "Civic Engagement", "Climate Change", "Substance Abuse", "Veganism"], []);
  const [filteredItems, filterWith] = useFilter(passions);

  const passion = watch('passions');

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-between px-10 grow sm:grow-0"
    >
      <div className="flex flex-col h-[28rem]">
        {' '}
        <h1 className="font-helmet ">What are your social causes?</h1>
        <p className="text-base text-graySubtitle ">
          Select up to 5 social causes that you are passionate about
        </p>
        <div className="flex flex-col bg-offWhite px-5 my-5 -mx-16">
          <SearchBar
            type="text"
            placeholder="Search"
            onChangeText={filterWith}
            className="my-6"
          />
          <div className="flex flex-col  border-t-2 border-b-grayLineBased -mx-5 px-5">
            <h3 className="py-3">Popular</h3>
            <div className="flex flex-wrap space-x-2 h-32 overflow-y-auto ">
              {filteredItems.map((skill, index) => (
                <Chip
                  onSelected={onSelect}
                  selected={selecteds?.includes(skill)}
                  value={skill}
                  key={`skill-${index}`}
                  content={skill}
                  contentClassName="text-secondary cursor-pointer"
                  containerClassName="bg-background my-2  h-8"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="sm:h-48 border-t-2 border-b-grayLineBased divide-x -mx-16 ">
        <Button
          className="max-w-xs w-full  m-auto flex items-center justify-center align-middle mt-4 "
          type="submit"
          size="lg"
          variant="fill"
          value="Submit"
          disabled={!(passion?.length === maxCauses)}
        >
          Continue
        </Button>
      </div>
    </form>
  );
};

export default OnboardingStep3;
