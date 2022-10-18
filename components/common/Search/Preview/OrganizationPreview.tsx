import {FC} from 'react';
import Avatar from '@components/common/Avatar/Avatar';
import Chip from '@components/common/Chip/Chip';
import {useOrganization} from '@hooks';
import {getText} from '@socious/data';

interface OrganizationPreviewProps {
  id: string;
}

export const OrganizationPreview: FC<OrganizationPreviewProps> = ({id}) => {
  const {data: org} = useOrganization(id);

  if (!org) return null;
  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Avatar
            size="xl"
            type="organizations"
            src={typeof org?.image === 'string' ? org.image : org.image?.url}
          />
          <div className="flex flex-1 flex-col justify-center ">
            <p className="max-w-[250px] truncate text-black">{org?.name}</p>
            <p className="max-w-[250px] truncate  text-graySubtitle">
              {org?.address}
            </p>
          </div>
        </div>
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
