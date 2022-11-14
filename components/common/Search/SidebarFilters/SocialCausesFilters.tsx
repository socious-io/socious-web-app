import Chip from '@components/common/Chip/Chip';
import {PencilIcon} from '@heroicons/react/24/outline';
import {getText} from '@socious/data';
import {useRouter} from 'next/router';
import {FC} from 'react';

interface SocialCausesFiltersProps {
  onEdit: () => void;
}

export const SocialCausesFilters: FC<SocialCausesFiltersProps> = ({onEdit}) => {
  const route = useRouter();
  const selectedSocialCauses = route.query.social_causes?.toString().split(',');

  const removeSocialCause = (removingCause: string) => {
    const newSocialCauses = selectedSocialCauses?.filter(
      (cause) => cause !== removingCause,
    );
    if (newSocialCauses?.length) {
      route.query.social_causes = newSocialCauses?.join(',');
    } else {
      delete route.query.social_causes;
    }
    route.push(route);
  };

  return (
    <div>
      <div className="mb-4 flex justify-between">
        <h3 className="text-xl font-semibold text-Gray03">Social Cause</h3>
        <PencilIcon
          className="w-5 cursor-pointer text-primary"
          onClick={onEdit}
        />
      </div>
      <div className="h-36 space-y-2 overflow-auto rounded-xl border border-grayLineBased bg-white p-4">
        {selectedSocialCauses?.map(
          (cause) =>
            cause && (
              <Chip
                value={cause}
                key={cause}
                content={getText('en', `PASSION.${cause}`)}
                onRemove={removeSocialCause}
              />
            ),
        )}
      </div>
    </div>
  );
};
