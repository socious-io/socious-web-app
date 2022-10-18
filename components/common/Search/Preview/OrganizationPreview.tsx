import {FC} from 'react';
import Avatar from '@components/common/Avatar/Avatar';
import Chip from '@components/common/Chip/Chip';
import {useOrganization} from '@hooks';
import {getText} from '@socious/data';
import Link from 'next/link';
import {useFormattedLocation} from 'services/formatLocation';

interface OrganizationPreviewProps {
  id: string;
}

export const OrganizationPreview: FC<OrganizationPreviewProps> = ({id}) => {
  const {data: org} = useOrganization(id);
  const location = useFormattedLocation(org);
  if (!org) return null;
  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <Link href={`/app/organization/${org.shortname}`}>
          <div className="flex cursor-pointer items-center space-x-2">
            <Avatar
              size="xl"
              type="organizations"
              src={typeof org?.image === 'string' ? org.image : org.image?.url}
            />
            <div className="flex flex-1 flex-col justify-center ">
              <p className="max-w-[250px] truncate text-black">{org?.name}</p>
              {location && (
                <p className="max-w-[250px] truncate  text-graySubtitle">
                  {location}
                </p>
              )}
            </div>
          </div>
        </Link>
      </div>

      {org.social_causes?.length ? (
        <>
          <hr />
          <div>
            <strong className="mb-2 block">Social causes</strong>
            <div className="flex flex-wrap gap-2">
              {org.social_causes?.map((ct: string) => {
                return (
                  <Chip
                    key={`${ct}`}
                    content={`${getText('en', `PASSION.${ct}`)}`}
                    contentClassName="text-secondary text-sm"
                  />
                );
              })}
            </div>
          </div>
        </>
      ) : null}

      {org.description?.length ? (
        <>
          <hr />
          <div>
            <strong className="mb-2 block">Description</strong>
            <p className="text-sm">{org.description}</p>
          </div>
        </>
      ) : null}
    </div>
  );
};
