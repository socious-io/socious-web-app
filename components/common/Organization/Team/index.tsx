import {useToggle} from '@hooks';
import Image from 'next/image';
import {users} from '../data';
import MemberItem from './MemberItem';
import NewMemberModal from './NewMemberModal';
import AddTeamMember from '@icons/addTeamMembers.svg';
import More from '@icons/more.svg';

export interface IUserType {
  id: number;
  name: string;
  location: string;
  img: string;
  requested: boolean;
}

const TeamComponent = () => {
  const {state: addState, handlers: addHandlers} = useToggle();

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
          {users.map((item, index) => (
            <MemberItem
              key={`${item.name}-${index}`}
              name={item.name}
              location={item.location}
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

      <div>
        <div className="border-b p-4">
          <h3 className="text-xl font-semibold">Members</h3>
        </div>
        <div>
          {users.map((item, index) => (
            <MemberItem
              key={`${item.name}-${index}`}
              name={item.name}
              location={item.location}
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
      <NewMemberModal open={addState} onClose={addHandlers.off} users={users} />
    </div>
  );
};
export default TeamComponent;
