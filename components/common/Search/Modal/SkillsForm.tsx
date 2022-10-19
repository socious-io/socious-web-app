import Button from '@components/common/Button/Button';
import Chip from '@components/common/Chip/Chip';
import {FromLayout} from '@components/common/Project/created/NewProject/Layout';
import SearchBar from '@components/common/SearchBar/SearchBar';
import useFilter, {ObjectType} from 'hooks/auth/useFilter';
import {useRouter} from 'next/router';
import {FC} from 'react';
import {useForm, useWatch, FieldValues} from 'react-hook-form';
import {useSkills} from '../Providers/SkillsProvider';

const MAX_SKILLS = 10;

interface SkillsFormProps {
  onSubmit?: (data: FieldValues) => void;
}

export const SkillsForm: FC<SkillsFormProps> = ({onSubmit}) => {
  const route = useRouter();
  const {handleSubmit, setValue, control} = useForm();
  const {skills} = useSkills();
  const paramSkills = (route.query.skills as string)?.split(',');

  const selectedSkills = useWatch({
    name: 'skills',
    defaultValue: paramSkills || [],
    control,
  });

  const [filteredItems, filterWith] = useFilter(skills as ObjectType[]);

  const handleChange = (field: string, item: {id: string; name: string}) => {
    if (selectedSkills?.includes(item?.id)) {
      setValue(
        field,
        selectedSkills?.filter((i: string) => i !== item.id),
        {
          shouldValidate: true,
        },
      );
    } else if (selectedSkills?.length < MAX_SKILLS) {
      setValue(field, [...selectedSkills, item.id], {
        shouldValidate: true,
      });
    }
  };

  const onSubmitSkills = (data: FieldValues) => {
    if (data.skills.length) {
      route.query.skills = data.skills.join(',');
      route.push(route);
    }
    onSubmit?.(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitSkills)}
      className="flex h-full w-full flex-col"
    >
      <FromLayout>
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
              const selected = selectedSkills?.includes(item?.id);
              return (
                <Chip
                  onSelected={() => handleChange('skills', item)}
                  selected={selected}
                  value={item.id}
                  key={item.id}
                  containerClassName={selected ? 'bg-secondary' : 'bg-white'}
                  contentClassName={selected ? 'text-white' : 'text-secondary'}
                  content={item.name}
                  withCheckIcon={false}
                />
              );
            })}
          </div>
        </div>
      </FromLayout>
      <div className=" flex items-end justify-end  border-t p-4">
        <Button
          type="submit"
          className="flex items-center justify-center px-10"
        >
          Confirm
        </Button>
      </div>
    </form>
  );
};
