import React, {FC, useMemo} from 'react';
import {useFormContext} from 'react-hook-form';

import Chip from '@components/common/Chip/Chip';
import SearchBar from '@components/common/SearchBar/SearchBar';
import useFilter from 'hooks/auth/useFilter';
import Title from '@components/molecules/Title';
import {Button, ComboBoxSelectionType} from '@components/common';
import {FormLayout} from '@components/common/Project/created/NewProject/Layout';
import {getText} from '@socious/data';
import useHandleSelected from 'hooks/useHandleSelected';

interface ProjectSkillType {
  onSubmit: () => void;
  rawSkills: any[];
}

const Skills: FC<ProjectSkillType> = ({onSubmit, rawSkills}) => {
  const maxSkills = 10;

  const {
    formState: {isValid},
    handleSubmit,
  } = useFormContext();
  const [selected, onSelect] = useHandleSelected('skills', maxSkills);
  const skills = useMemo(() => {
    const sorted: Array<ComboBoxSelectionType> = [];
    rawSkills?.forEach((skill) => {
      const name = getText('en', `SKILL.${skill?.name}`);
      if (name) sorted.push({id: skill.name, name});
    });
    sorted.sort((a, b) => (a.name > b.name ? 1 : -1));
    return sorted;
  }, [
    // todo: language
    rawSkills,
  ]);
  const [filteredItems, filterWith] = useFilter(skills);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-full w-full flex-col"
    >
      <FormLayout>
        <Title description="Skills used in this project" border={false}>
          Select up to 10 relevant skills
        </Title>
        <SearchBar
          type="text"
          placeholder="Search"
          onChange={(e) => filterWith(e?.currentTarget?.value || '')}
          className="my-6 mx-6"
        />
        <div className="h-14 w-full grow overflow-y-scroll bg-offWhite">
          <p className="px-6 pt-4 text-sm font-semibold text-black">Popular</p>
          <div className="flex w-5/6 flex-wrap gap-2 px-4 py-4">
            {filteredItems.map((item) => {
              return (
                <Chip
                  onSelected={onSelect}
                  selected={selected?.includes(item.id)}
                  value={item.id}
                  key={item.id}
                  contentClassName="text-secondary cursor-pointer "
                  containerClassName="bg-background my-2 h-6"
                  content={item.name}
                />
              );
            })}
          </div>
        </div>
      </FormLayout>
      <div className=" flex items-end justify-end  border-t p-4">
        <Button
          disabled={!isValid}
          type="button"
          onClick={() => onSubmit()}
          className="flex h-11 w-52 items-center justify-center"
        >
          Continue
        </Button>
      </div>
    </form>
  );
};

export default Skills;
