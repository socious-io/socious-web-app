import {useToggle, useUser} from '@hooks';
import Image from 'next/image';
import MemberItem from './MemberItem';
import NewMemberModal from './NewMemberModal';
import AddTeamMember from '@icons/addTeamMembers.svg';
import More from '@icons/more.svg';
import {useEffect, useState} from 'react';
import {
  getFollowers,
  getOrganizationMembers,
} from '@api/organizations/team/actions';
import {
  GlobalResponseType,
  IOrganizationFollowerType,
  IOrganizationUserType,
} from '@models/organization';

const TeamComponent = () => {
  const {currentIdentity} = useUser({
    redirect: false,
  });
  const {state: addState, handlers: addHandlers} = useToggle();
  const [members, setMembers] = useState<IOrganizationUserType[]>();
  const [followers, setFollowers] = useState<IOrganizationFollowerType[]>();

  const getOrgMembers = async () => {
    try {
      if (currentIdentity && currentIdentity.type === 'organizations') {
        const data: GlobalResponseType<IOrganizationUserType> =
          await getOrganizationMembers(currentIdentity.id);
        setMembers(data.items);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getOrgFollowers = async () => {
    try {
      if (currentIdentity) {
        console.log('innnnnn');
        const data: GlobalResponseType<IOrganizationFollowerType> =
          await getFollowers();
        setFollowers(data.items);
        console.log('hereeee', data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    console.log('ooooo', currentIdentity);
    getOrgMembers();
    getOrgFollowers();
  }, [currentIdentity?.id]);

  return (
    <div className="w-full rounded-2xl border border-grayLineBased bg-white ">
      <div className="flex border-b p-4">
        <div className="flex grow items-center justify-center text-center">
          <p className="text-xl font-bold text-black">Team</p>
        </div>
        <div>
          <span className=" cursor-pointer " onClick={addHandlers.on}>
            <Image
              src={AddTeamMember}
              alt="add-new-member-icon"
              width={24}
              height={24}
            />
          </span>
        </div>
      </div>
      <div>
        <div className="border-b p-4">
          <h3 className="text-xl font-semibold">Admin</h3>
        </div>
        <div>
          {members?.map((item, index) => (
            <MemberItem
              key={`${item.first_name}-${index}`}
              name={item.first_name}
              detail={item.location}
              Extra={
                <div>
                  <Image
                    src={More}
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
          getOrgMembers={getOrgMembers}
          open={addState}
          onClose={addHandlers.off}
          users={followers}
          orgId={currentIdentity.id}
        />
      )}
    </div>
  );
};
export default TeamComponent;
