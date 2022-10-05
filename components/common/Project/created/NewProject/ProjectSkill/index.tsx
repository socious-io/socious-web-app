import React, {FC, useEffect, useMemo} from 'react';
import Chip from '@components/common/Chip/Chip';
import SearchBar from '@components/common/SearchBar/SearchBar';
import {useForm} from 'react-hook-form';
import useFilter from 'hooks/auth/useFilter';
import Title from '@components/common/CreateOrganization/components/Title';
import {useProjectContext} from '../context';
import {toast} from 'react-toastify';
import {joiResolver} from '@hookform/resolvers/joi';
import {schemaCreateProjectStep2} from '@api/projects/validation';
import {Button} from '@components/common';
import {FromLayout} from '../Layout';
import {TOnSubmit} from '../sharedType';
import type {NextPage} from 'next';
import {getText} from '@socious/data';

interface ProjectSkillType extends TOnSubmit {
  rawSkills: any[];
}

const ProjectSkill: NextPage<ProjectSkillType> = ({onSubmit, rawSkills}) => {
  const {
    handleSubmit,
    formState: {isValid},
    setValue,
  } = useForm({
    resolver: joiResolver(schemaCreateProjectStep2),
  });

  const skills = useMemo(() => {
    const sorted: {id: string; name: string}[] = [];
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
  const {ProjectContext, setProjectContext} = useProjectContext();

  const maxSkills = 10;
  const [filteredItems, filterWith] = useFilter(skills);

  const handleChange = (field: string, item: {id: string; name: string}) => {
    const skills = ProjectContext.skills;
    if (skills?.includes(item?.id)) {
      setValue(
        field,
        skills?.filter((i) => i !== item.id),
        {
          shouldValidate: true,
        },
      );
      setProjectContext({
        ...ProjectContext,
        skills: skills?.filter((i) => i !== item?.id),
      });
    } else {
      if (skills?.length < maxSkills) {
        setValue(field, [...skills, item.id], {
          shouldValidate: true,
        });
        setProjectContext({
          ...ProjectContext,
          skills: [...skills, item?.id],
        });
      } else {
        toast.success('You selected 10 skills');
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-full w-full flex-col"
    >
      <FromLayout>
        <Title description="What skills do you have?" border={false}>
          Showcase up to 10 skills you can contribute to help social impact
          initiatives and organizations
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
                  onSelected={() => handleChange('skills', item)}
                  selected={ProjectContext.skills?.includes(item?.id)}
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
      </FromLayout>
      <div className=" flex items-end justify-end  border-t p-4">
        <Button
          disabled={ProjectContext.isEditModalOpen ? false : !isValid}
          type="submit"
          className="flex h-11 w-52 items-center justify-center"
        >
          {ProjectContext.isEditModalOpen ? 'Save Changes' : ' Continue'}
        </Button>
      </div>
    </form>
  );
};

export default ProjectSkill;
