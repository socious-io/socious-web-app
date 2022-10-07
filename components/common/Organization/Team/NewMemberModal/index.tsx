import Image from 'next/image';
import Modal from '@components/common/Modal/Modal';
import SearchBar from '@components/common/SearchBar/SearchBar';
import {XMarkIcon} from '@heroicons/react/24/solid';
import {ChangeEventHandler, FC, useCallback, useState} from 'react';
import useSWRInfinite from 'swr/infinite';
import Button from '@components/common/Button/Button';
import MemberItem from '../MemberItem';
import {
  ChevronLeftIcon,
  CheckCircleIcon,
  UserPlusIcon,
} from '@heroicons/react/24/outline';
import {
  GlobalResponseType,
  IOrganizationFollowerType,
} from '@models/organization';
import {addMember} from '@api/organizations/team/actions';
import {get} from 'utils/request';
interface INewMemberModalProps {
  open: boolean;
  orgId: string;
  onClose: () => void;
  onAddNewMember: () => void;
}

const NewMemberModal: FC<INewMemberModalProps> = ({
  open,
  orgId,
  onClose,
  onAddNewMember,
}) => {
  const [step, setStep] = useState<number>(1);
  const [role, setRole] = useState<UserRole>('admin');
  const [selectedUser, setSelectedUser] = useState<IOrganizationFollowerType>();
  const [searchTerm, setSearchTerm] = useState<string>('');

  const getKey = useCallback(
    (initialSize: number, previousData: any) => {
      if (previousData && previousData?.items?.length < 10) return null;
      if (searchTerm.trim().length)
        return `/follows/followers?page=${
          initialSize + 1
        }&name=${searchTerm.trim()}`;
      return `/follows/followers?page=${initialSize + 1}`;
    },
    [searchTerm],
  );

  const {data: users, size} = useSWRInfinite<
    GlobalResponseType<IOrganizationFollowerType>
  >(getKey, get, {
    shouldRetryOnError: false,
  });
  const hasMore = size * 10 < (users?.[0]?.total_count ?? 0);

  const changeRole = (newRole: UserRole) => {
    setRole(newRole);
  };

  const onAddMember = (user: IOrganizationFollowerType) => {
    setSelectedUser(user);
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

  const onConfirm = async () => {
    if (selectedUser) {
      try {
        const response = await addMember(orgId, selectedUser.identity_meta.id);
        // TODO 2 following lines should call if member  successfully added
        onClose();
        onAddNewMember();
      } catch (error) {
        console.error(error);
        onClose();
        setStep(1);
      }
    }
  };

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      className="-m-4 h-screen w-screen rounded-none p-0 sm:m-0 sm:h-auto sm:rounded-2xl"
    >
      {step === 1 && (
        <AddMember
          users={users}
          onClose={onClose}
          onAddMember={onAddMember}
          onSetSearch={setSearchTerm}
        />
      )}
      {step === 2 && (
        <ConfirmUserRole
          role={role}
          onConfirmRole={changeRole}
          onClose={onResetStep}
          onClickBack={onClickBack}
          onConfirm={onConfirm}
        />
      )}
    </Modal>
  );
};

export default NewMemberModal;
type UserRole = 'member' | 'admin';
interface IConfirmUserRole {
  role: UserRole;
  onConfirmRole: (role: UserRole) => void;
  onClose: () => void;
  onClickBack: () => void;
  onConfirm: () => void;
}
const ConfirmUserRole: FC<IConfirmUserRole> = ({
  role,
  onConfirmRole,
  onConfirm,
  onClose,
  onClickBack,
}) => {
  return (
    <>
      <div className="flex items-center border-b p-3">
        <span className="cursor-pointer" onClick={onClickBack}>
          <ChevronLeftIcon className="w-5" />
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
            {/* TODO add classNames package to use conditional classes on the components */}
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
                  <CheckCircleIcon className="w-5" />
                </span>
              )}
            </div>
            {/* <div
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
                  <CheckCircleIcon className="w-5" />
                </span>
              )}
            </div> */}
          </div>
          <div className="fixed  right-0 left-0 bottom-4 flex justify-end gap-2 p-2 px-4">
            <Button variant="fill" onClick={onConfirm}>
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
  users: Array<GlobalResponseType<IOrganizationFollowerType>> | undefined;
  onClose: () => void;
  onAddMember: (member: IOrganizationFollowerType) => void;
  onSetSearch: (search: string) => void;
}
const AddMember: FC<IAddMemberProps> = ({
  users,
  onAddMember,
  onClose,
  onSetSearch,
}) => {
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
          <div className="mt-3 border-t border-b bg-zinc-100 p-3">
            <SearchBar
              type="text"
              placeholder="Search"
              onChange={(e) => onSetSearch(e.target.value)}
            />
          </div>
          <div className="overflow-y-auto">
            <div className="flex h-full h-80 flex-col">
              {users?.map((page) =>
                page.items.map(
                  (item, index) =>
                    // temp hack until BE adds the filter
                    item.identity_type === 'users' && (
                      <MemberItem
                        key={`m-${item.identity_meta.id}-${index}`}
                        name={item.identity_meta.name}
                        detail={item.identity_meta.email}
                        Extra={
                          false ? (
                            <Button variant="outline" size="sm">
                              request sent
                            </Button>
                          ) : (
                            <span
                              className="cursor-pointer"
                              onClick={() => onAddMember(item)}
                            >
                              <UserPlusIcon className="w-6" />
                            </span>
                          )
                        }
                      />
                    ),
                ),
              )}
              <div></div>
            </div>
          </div>
        </Modal.Description>
      </div>
    </>
  );
};
