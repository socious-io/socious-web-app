import Image from 'next/image';
import Modal from '@components/common/Modal/Modal';
import SearchBar from '@components/common/SearchBar/SearchBar';
import {XMarkIcon} from '@heroicons/react/24/solid';
import {FC, useState} from 'react';
import {IUserType} from '..';
import Avatar from '@components/common/Avatar/Avatar';
import Button from '@components/common/Button/Button';
import MemberItem from '../MemberItem';
import AddTeamMember from '@icons/addTeamMembers.svg';
import LeftIcon from '@icons/iconLeft.svg';
import checkIcon from '@icons/check.svg';
interface INewMemberModalProps {
  open: boolean;
  users: Array<IUserType>;
  onClose: () => void;
}

const NewMemberModal: FC<INewMemberModalProps> = ({open, users, onClose}) => {
  const [step, setStep] = useState<number>(1);
  const [role, setRole] = useState<UserRole>('admin');
  const changeRole = (newRole: UserRole) => {
    setRole(newRole);
  };

  const onAddMember = () => {
    setStep(2);
  };
  const onClickBack = () => {
    setStep(1);
  };

  const onResetStep = () => {
    setTimeout(() => {
      setStep(1);
    }, 500);
    onClose();
  };

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      className="-m-4 h-screen w-screen rounded-none p-0 sm:m-0 sm:h-auto sm:rounded-2xl"
    >
      {step === 1 && (
        <AddMember users={users} onClose={onClose} onAddMember={onAddMember} />
      )}
      {step === 2 && (
        <ConfrimUserRole
          role={role}
          onConfirmRole={changeRole}
          onClose={onResetStep}
          onClickBack={onClickBack}
        />
      )}
    </Modal>
  );
};

export default NewMemberModal;
type UserRole = 'member' | 'admin';
interface IConfrimUserRole {
  role: UserRole;
  onConfirmRole: (role: UserRole) => void;
  onClose: () => void;
  onClickBack: () => void;
}
const ConfrimUserRole: FC<IConfrimUserRole> = ({
  role,
  onConfirmRole,
  onClose,
  onClickBack,
}) => {
  return (
    <>
      <div className="flex items-center border-b p-3">
        <span className="cursor-pointer" onClick={onClickBack}>
          <Image src={LeftIcon} alt="back-icon" width={18} height={18} />
        </span>
        <div className="grow">
          <Modal.Title>
            <p className="min-h-[30px] py-2 text-center text-xl">
              {' '}
              Add name as a...
            </p>
          </Modal.Title>
        </div>
      </div>
      <Modal.Description>
        <div className=" py-2">
          <div className={'h-80  p-2 px-4'}>
            <div
              onClick={() => onConfirmRole('admin')}
              className={
                role === 'admin'
                  ? 'relative my-3 cursor-pointer rounded-xl border border-blue-900 bg-slate-50 py-2 px-4 transition'
                  : 'relative my-3 cursor-pointer rounded-xl border border-transparent py-2 px-4 transition'
              }
            >
              <p>Admin</p>
              <span className="text-sm text-gray-400">
                Manage and edit organization page
              </span>
              {role === 'admin' && (
                <span className="absolute top-6 right-4 block">
                  <Image
                    src={checkIcon}
                    alt="check-icon"
                    width={18}
                    height={18}
                  />
                </span>
              )}
            </div>
            <div
              onClick={() => onConfirmRole('member')}
              className={
                role === 'member'
                  ? 'relative my-3 cursor-pointer rounded-xl border border-blue-900 bg-slate-50 py-2 px-4 transition-all'
                  : 'relative my-3 cursor-pointer rounded-xl border border-transparent py-2 px-4 transition-all'
              }
            >
              <p>Member</p>
              <span className="text-sm text-gray-400">
                Only view permissions
              </span>
              {role === 'member' && (
                <span className="absolute top-6 right-4 block">
                  <Image
                    src={checkIcon}
                    alt="check-icon"
                    width={18}
                    height={18}
                  />
                </span>
              )}
            </div>
          </div>
          <div className="fixed  right-0 left-0 bottom-4 flex justify-end gap-2 p-2 px-4">
            <Button variant="fill" onClick={onClose}>
              Confirm
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal.Description>
    </>
  );
};

interface IAddMemberProps {
  users: Array<IUserType>;
  onClose: () => void;
  onAddMember: (id: number) => void;
}
const AddMember: FC<IAddMemberProps> = ({users, onAddMember, onClose}) => {
  return (
    <>
      <div className="p-3">
        <span className="absolute right-3 cursor-pointer " onClick={onClose}>
          <XMarkIcon className="w-6" />
        </span>
      </div>
      <Modal.Title>
        <p className="min-h-[30px] text-center text-xl">Add members</p>
      </Modal.Title>
      <div>
        <Modal.Description>
          <div className="flex h-full flex-col">
            <div className="mt-3 border-t border-b bg-zinc-100 p-3">
              <SearchBar
                type="text"
                placeholder="Search"
                onChange={(e) => console.log(e)}
              />
            </div>
            {users.map((item, index) => (
              <MemberItem
                key={`m-${item.name}-${index}`}
                name={item.name}
                location={item.location}
                Extra={
                  item.requested ? (
                    <Button variant="outline" size="sm">
                      request sent
                    </Button>
                  ) : (
                    <span
                      className="cursor-pointer"
                      onClick={() => onAddMember(item.id)}
                    >
                      <Image
                        src={AddTeamMember}
                        alt="back-icon"
                        width={24}
                        height={24}
                      />
                    </span>
                  )
                }
              />
            ))}
            <div></div>
          </div>
        </Modal.Description>
      </div>
    </>
  );
};
