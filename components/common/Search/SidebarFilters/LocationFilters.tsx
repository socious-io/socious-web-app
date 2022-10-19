import Chip from '@components/common/Chip/Chip';
import {PencilIcon} from '@heroicons/react/24/outline';
import {useRouter} from 'next/router';
import {FC} from 'react';

interface LocationFiltersProps {
  onEdit: () => void;
}

export const LocationFilters: FC<LocationFiltersProps> = ({onEdit}) => {
  const route = useRouter();
  const {country, city} = route.query;
  const location = [city, country].join(', ');

  const removeLocationQuery = () => {
    delete route.query.country;
    delete route.query.city;
    route.push(route);
  };

  return (
    <div>
      <div className="mb-4 flex justify-between">
        <h3 className="text-xl font-semibold text-Gray03">Location</h3>
        <PencilIcon
          className="w-4 cursor-pointer text-primary"
          onClick={onEdit}
        />
      </div>
      <div className="flex h-12 items-center overflow-auto rounded-xl border border-grayLineBased bg-white px-4">
        {country ? (
          <Chip
            value={location}
            content={location}
            onRemove={removeLocationQuery}
          />
        ) : null}
      </div>
    </div>
  );
};
