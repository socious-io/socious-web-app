import React, {FC, useEffect} from 'react';
import Chip from '@components/common/Chip/Chip';
import SearchBar from '@components/common/SearchBar/SearchBar';
import {useForm} from 'react-hook-form';
import useFilter from 'hooks/auth/useFilter';
import Title from '@components/molecules/Title';
import {passionDataItems} from 'utils/socious-data';
import {useProjectContext} from '../context';
import {joiResolver} from '@hookform/resolvers/joi';
import {schemaCreateProjectStep1} from '@api/projects/validation';
import {Button} from '@components/common';
import {FormLayout} from '../Layout';
import {TOnSubmit} from '../sharedType';

const ProjectAbout: FC<TOnSubmit> = ({onSubmit}) => {
  const {
    formState: {isValid},
    setValue,
  } = useForm({
    resolver: joiResolver(schemaCreateProjectStep1),
  });

  const {ProjectContext, setProjectContext} = useProjectContext();

  const maxCauses = 5;
  const [filteredItems, filterWith] = useFilter(passionDataItems);
  useEffect(() => {
    if (ProjectContext) {
      setValue('causes_tags', ProjectContext.causes_tags, {
        shouldValidate: true,
      });
    }
  }, [ProjectContext, setValue]);

  const handleChange = (field: string, item: {id: string; name: string}) => {
    const causesTags = ProjectContext.causes_tags;
    if (causesTags?.includes(item?.id)) {
      setValue(
        field,
        causesTags?.filter((i) => i !== item.id),
        {
          shouldValidate: true,
        },
      );
      setProjectContext({
        ...ProjectContext,
        causes_tags: causesTags?.filter((i) => i !== item?.id),
      });
    } else {
      if (causesTags?.length < maxCauses) {
        setValue(field, [...causesTags, item.id], {
          shouldValidate: true,
        });
        setProjectContext({
          ...ProjectContext,
          causes_tags: [...causesTags, item?.id],
        });
      } else {
        // toast.success('You selected 5 passions');
      }
    }
  };

  return (
    <form
      // onSubmit={handleSubmit(onSubmit)}
      className="flex h-full w-full flex-col"
    >
      <FormLayout>
        <Title description="Select up to 5 social causes" border={false}>
          What is your project about?
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
                  onSelected={() => handleChange('causes_tags', item)}
                  selected={ProjectContext.causes_tags?.includes(item?.id)}
                  value={item.id}
                  key={item.id}
                  content={item.name}
                  contentClassName="text-secondary cursor-pointer "
                  containerClassName="bg-background my-2 h-6"
                />
              );
            })}
          </div>
        </div>
      </FormLayout>
      <div className=" flex items-end justify-end  border-t p-4">
        <Button
          disabled={ProjectContext.isEditModalOpen ? false : !isValid}
          type="button"
          onClick={() => onSubmit()}
          className="flex h-11 w-52 items-center justify-center"
        >
          {ProjectContext.isEditModalOpen ? 'Save Changes' : ' Continue'}
        </Button>
      </div>
    </form>
  );
};

export default ProjectAbout;
