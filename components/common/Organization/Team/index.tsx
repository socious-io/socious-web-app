import {useToggle, useUser} from '@hooks';
import Image from 'next/image';
import NewMemberModal from './NewMemberModal';
import {UserPlusIcon} from '@heroicons/react/24/outline';
import useSWR from 'swr';
import {get} from 'utils/request';
import {GlobalResponseType, IOrganizationUserType} from '@models/organization';
import {FC, PropsWithChildren} from 'react';
import {Avatar} from '@components/common';
import Link from 'next/link';

interface IMemberItemProps extends PropsWithChildren {
  member: IOrganizationUserType;
}
const MemberItem: FC<IMemberItemProps> = ({member, children}) => {
  return (
    <div className="flex items-center  border-b py-2 px-4">
      <Link href={`/app/user/${member.username}`}>
        <a>
          <Avatar size="l" src={member.avatar?.url} />
        </a>
      </Link>
      <div className="flex grow flex-col p-1 px-3">
        <Link href={`/app/user/${member.username}`}>
          <a>
            {member.first_name} {member.last_name}
          </a>
        </Link>
      </div>
      <div>{children}</div>
    </div>
  );
};

const TeamComponent = () => {
  const {currentIdentity} = useUser();
  const {state: addState, handlers: addHandlers} = useToggle();
  const {data: members, mutate} = useSWR<
    GlobalResponseType<IOrganizationUserType>
  >(
    // FIXME hardcoded limit
    currentIdentity ? `/orgs/${currentIdentity?.id}/members?limit=500` : null,
    get,
  );

  const onAddNewMember = () => {
    mutate();
  };

  const memberIds = members?.items
    ? members.items.map((member) => member.id)
    : [];

  return (
    <div className="w-full rounded-2xl border border-grayLineBased bg-white ">
      <div className="flex border-b p-4">
        <div className="flex grow items-center justify-center text-center">
          <p className="text-xl font-bold text-black">Team</p>
        </div>
        <div>
          <span className=" cursor-pointer " onClick={addHandlers.on}>
            <UserPlusIcon className="w-6" />
          </span>
        </div>
      </div>
      <div>
        {/* <div className="border-b p-4">
          <h3 className="text-xl font-semibold">Admin</h3>
        </div> */}
        <div>
          {members?.items?.map((item, index) => (
            <MemberItem key={item.id} member={item}>
              {/* // TODO popup menu */}
              <></>
            </MemberItem>
          ))}
        </div>
      </div>

      {currentIdentity && (
        <NewMemberModal
          onAddNewMember={onAddNewMember}
          memberIds={memberIds}
          open={addState}
          onClose={addHandlers.off}
          orgId={currentIdentity.id}
        />
      )}
    </div>
  );
};
export default TeamComponent;
