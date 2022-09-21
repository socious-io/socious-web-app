import {SearchBar, Button, Chip} from '@components/common';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {StepProps} from '@models/stepProps';
import {useFormContext} from 'react-hook-form';
import useFilter from 'hooks/auth/useFilter';
import useHandleSelected from 'hooks/auth/useHandleSelected';

const OnboardingStep3 = ({onSubmit}: StepProps) => {
  const maxCauses = 5;
  const [selecteds, onSelect] = useHandleSelected('passions', maxCauses);

  const formMethods = useFormContext();
  const {handleSubmit, watch} = formMethods;

  const passions = useMemo(
    () => [
      'inequilty',
      'Mental Health',
      'Neurodiversity',
      'Civic Engagement',
      'Climate Change',
      'Substance Abuse',
      'Veganism',
    ],
    [],
  );
  const [filteredItems, filterWith] = useFilter(passions);

  const passion = watch('passions');

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex grow flex-col justify-between px-10 sm:grow-0"
    >
      <div className="flex h-[28rem] flex-col">
        {' '}
        <h1 className="font-helmet ">What are your social causes?</h1>
        <p className="text-base text-graySubtitle ">
          Select up to 5 social causes that you are passionate about
        </p>
        <div className="my-5 -mx-16  flex  h-72 flex-col bg-offWhite px-5">
          <SearchBar
            type="text"
            placeholder="Search"
            onChangeTxt={filterWith}
            className="my-6"
          />
          <div className="-mx-5 flex h-full flex-col border-t-2 border-b-grayLineBased bg-offWhite px-5">
            <h3 className="py-3">Popular</h3>
            <div className="flex h-full flex-wrap space-x-2 overflow-y-auto sm:h-32 ">
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

      <div className="-mx-16 divide-x border-t-2 border-b-grayLineBased sm:h-48 ">
        <Button
          className="m-auto mt-4 mb-12 flex w-full max-w-xs items-center justify-center align-middle "
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
