import {SearchBar, Button, Chip} from '@components/common';
import {useState, useMemo, useCallback} from 'react';
import {StepProps} from '@models/stepProps';
import {useFormContext} from 'react-hook-form';
import useFilter from 'hooks/auth/useFilter';
import useHandleSelected from 'hooks/auth/useHandleSelected';
import {getText} from '@socious/data';

interface StepPropsWithSkills extends StepProps {
  rawSkills: any[];
}

const OnboardingStep4 = ({onSubmit, rawSkills}: StepPropsWithSkills) => {
  const maxSkills = 10;
  const [selecteds, onSelect] = useHandleSelected('skills', maxSkills);

  const formMethods = useFormContext();
  const {watch, handleSubmit} = formMethods;

  const skills = useMemo(() => {
    const sorted: {id: string; name: string}[] = [];
    rawSkills?.forEach((skill) => {
      const name = getText('en', `SKILL.${skill.name}`);
      if (name) sorted.push({id: skill.name, name});
    });
    sorted.sort((a, b) => (a.name > b.name ? 1 : -1));
    return sorted;
  }, [
    // todo: language
    rawSkills,
  ]);
  const [filteredItems, filterWith] = useFilter(skills);

  const skill = watch('skills');

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex grow flex-col justify-between px-10 sm:grow-0"
    >
      <div className="flex h-[28rem] flex-col ">
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
            onChange={(e) => filterWith(e.currentTarget?.value || '')}
            className="my-6"
          />
          <div className="-mx-5 flex h-full flex-col border-t-2 border-b-grayLineBased bg-offWhite px-5">
            <h3 className="py-3">Accounting & Consultancy</h3>
            <div className="flex h-full flex-wrap space-x-2 overflow-y-auto sm:h-32 ">
              {filteredItems.map((skill: any, index: number) => (
                <Chip
                  onSelected={onSelect}
                  selected={selecteds?.includes(skill.id)}
                  value={skill.id}
                  key={`skill-${skill + index}`}
                  content={skill.name}
                  contentClassName="text-secondary cursor-pointer "
                  containerClassName="bg-background my-2 h-8"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="-mx-16  divide-x border-t-2 border-b-grayLineBased sm:h-48 ">
        <Button
          className="m-auto mt-4 mb-12 flex w-full max-w-xs items-center justify-center align-middle "
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
