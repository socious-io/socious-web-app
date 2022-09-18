import {UseFormRegisterReturn} from 'react-hook-form';
import {useEffect, useMemo, useState} from 'react';
import {Avatar, Combobox} from '@components/common';

// TODO this will actually come from socious-data
const SocialCauses = {
  SOCIAL: 'SOCIAL',
  POVERTY: 'POVERTY',
  HOMELESSNESS: 'HOMELESSNESS',
  HUNGER: 'HUNGER',
  HEALTH: 'HEALTH',
  SUBSTANCE_ABUSE: 'SUBSTANCE_ABUSE',
  MENTAL: 'MENTAL',
  BULLYING: 'BULLYING',
  SECURITY: 'SECURITY',
  EDUCATION: 'EDUCATION',
  GENDER_EQUALITY: 'GENDER_EQUALITY',
  GENDER_BASED_VIOLENCE: 'GENDER_BASED_VIOLENCE',
  SEXUAL_VIOLENCE: 'SEXUAL_VIOLENCE',
  DOMESTIC_VIOLENCE: 'DOMESTIC_VIOLENCE',
  WATER_SANITATION: 'WATER_SANITATION',
  SUSTAINABLE_ENERGY: 'SUSTAINABLE_ENERGY',
  DECENT_WORK: 'DECENT_WORK',
  INEQUALITY: 'INEQUALITY',
  MINORITY: 'MINORITY',
  MULTICULTURALISM: 'MULTICULTURALISM',
  DIVERSITY_INCLUSION: 'DIVERSITY_INCLUSION',
  INDIGENOUS_PEOPLES: 'INDIGENOUS_PEOPLES',
  DISABILITY: 'DISABILITY',
  LGBTQI: 'LGBTQI+',
  REFUGEE: 'REFUGEE',
  MIGRANTS: 'MIGRANTS',
  ORPHANS: 'ORPHANS',
  CHILD_PROTECTION: 'CHILD_PROTECTION',
  COMMUNITY_DEVELOPMENT: 'COMMUNITY_DEVELOPMENT',
  DEPOPULATION: 'DEPOPULATION',
  OVERPOPULATION: 'OVERPOPULATION',
  HUMAN_RIGHTS: 'HUMAN_RIGHTS',
  SUSTAINABILITY: 'SUSTAINABILITY',
  RESPONSIBLE_CONSUMPTION: 'RESPONSIBLE_CONSUMPTION',
  CLIMATE_CHANGE: 'CLIMATE_CHANGE',
  NATURAL_DISASTERS: 'NATURAL_DISASTERS',
  BIODIVERSITY: 'BIODIVERSITY',
  ANIMAL_RIGHTS: 'ANIMAL_RIGHTS',
  ARMED_CONFLICT: 'ARMED_CONFLICT',
  PEACEBUILDING: 'PEACEBUILDING',
  DEMOCRACY: 'DEMOCRACY',
  CIVIC_ENGAGEMENT: 'CIVIC_ENGAGEMENT',
  JUSTICE: 'JUSTICE',
  GOVERNANCE: 'GOVERNANCE',
  CRIME_PREVENTION: 'CRIME_PREVENTION',
  CORRUPTION: 'CORRUPTION',
  OTHER: 'OTHER',
  RURAL_DEVELOPMENT: 'RURAL_DEVELOPMENT',
  VEGANISM: 'VEGANISM',
  BLACK_LIVES_MATTER: 'BLACK_LIVES_MATTER',
  ISLAMOPHOBIA: 'ISLAMOPHOBIA',
  ANTI_SEMITISM: 'ANTI-SEMITISM',
};

const items = Object.entries(SocialCauses).map(([id, name]) => ({id, name}));

type selectionType = {
  id: string;
  name: string;
};

interface CausesTagBarProps {
  src: string;
  register: UseFormRegisterReturn;
  errorMessage?: any;
  preSelected?: string;
}

export const CausesTagBar = ({
  src,
  register,
  errorMessage,
  preSelected,
}: CausesTagBarProps) => {
  const [selected, setSelected] = useState<selectionType>();
  const sortedItems = useMemo(
    () => {
      const sorted = items.slice();
      sorted.sort((a, b) => (a.name > b.name ? 1 : -1));
      return sorted;
    },
    [
      // todo: language
    ],
  );
  useEffect(() => {
    if (preSelected)
      setSelected(items.find((item) => item.name === preSelected));
  }, [preSelected]);

  return (
    <div className="-ml-6 -mr-6 flex items-center space-x-3 border-y-[0.5px] border-[#C3C8D9] p-4">
      <Avatar src={src} size="m" />
      <Combobox
        register={register}
        selected={selected}
        onSelected={setSelected}
        items={sortedItems}
        errorMessage={errorMessage}
        required
        className="w-full"
        placeholder="social causes"
      />
    </div>
  );
};

export default CausesTagBar;
