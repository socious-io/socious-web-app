import {useToggle, useUser} from '@hooks';
import Image from 'next/image';
import MemberItem from './MemberItem';
import NewMemberModal from './NewMemberModal';
import {UserPlusIcon} from '@heroicons/react/24/outline';
import useSWR, {useSWRConfig} from 'swr';
import {get} from 'utils/request';
import {
  GlobalResponseType,
  IOrganizationFollowerType,
  IOrganizationUserType,
} from '@models/organization';
const more = require('../../../../asset/icons/more.svg');

const TeamComponent = () => {
  const {mutate} = useSWRConfig();
  const {currentIdentity} = useUser({
    redirect: false,
  });
  const {state: addState, handlers: addHandlers} = useToggle();
  const {data: members} = useSWR<GlobalResponseType<IOrganizationUserType>>(
    currentIdentity ? `/orgs/${currentIdentity?.id}/members` : null,
    get,
  );

  const {data: followers} = useSWR<
    GlobalResponseType<IOrganizationFollowerType>
  >(`/follows/followers`, get);

  const onAddNewMember = async () => {
    try {
      await mutate(`/orgs/${currentIdentity?.id}/members`);
    } catch (error) {
      // Handle error
    }
  };

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
        <div className="border-b p-4">
          <h3 className="text-xl font-semibold">Admin</h3>
        </div>
        <div>
          {members?.items?.map((item, index) => (
            <MemberItem
              key={`${item.first_name}-${index}`}
              name={item.first_name}
              detail={item.location}
              Extra={
                <div>
                  <Image
                    src={more}
                    alt="add-new-member-icon"
                    width={24}
                    height={24}
                  />
                </div>
              }
            />
          ))}
        </div>
      </div>

      {currentIdentity && (
        <NewMemberModal
          onAddNewMember={onAddNewMember}
          open={addState}
          onClose={addHandlers.off}
          users={followers?.items}
          orgId={currentIdentity.id}
        />
      )}
    </div>
  );
};
export default TeamComponent;
