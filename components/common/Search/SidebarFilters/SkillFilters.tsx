import Chip from '@components/common/Chip/Chip';
import {PencilIcon} from '@heroicons/react/24/outline';
import {getText} from '@socious/data';
import {useRouter} from 'next/router';
import {FC} from 'react';

interface SkillFiltersProps {
  onEdit: () => void;
}

export const SkillFilters: FC<SkillFiltersProps> = ({onEdit}) => {
  const route = useRouter();
  const selectedSkills = (route.query.skills as string)?.split(',');

  const removeSkillsQuery = (removingSkill: string) => {
    const newSkills = selectedSkills.filter((skill) => skill !== removingSkill);
    if (newSkills.length) {
      route.query.skills = newSkills.join(',');
    } else {
      delete route.query.skills;
    }
    route.push(route);
  };

  return (
    <div>
      <div className="mb-4 flex justify-between">
        <h3 className="text-xl font-semibold text-Gray03">Skills</h3>
        <PencilIcon
          className="w-5 cursor-pointer text-primary"
          onClick={onEdit}
        />
      </div>
      <div className="h-36 gap-2 space-y-2 overflow-y-auto overflow-x-hidden rounded-xl border border-grayLineBased bg-white p-4">
        {selectedSkills?.map(
          (skill) =>
            skill && (
              <Chip
                value={skill}
                key={skill}
                content={getText('en', `SKILL.${skill}`)}
                onRemove={removeSkillsQuery}
              />
            ),
        )}
      </div>
    </div>
  );
};
