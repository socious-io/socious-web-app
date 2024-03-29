import Modal from '@components/common/Modal/Modal';
import SearchBar from '@components/common/SearchBar/SearchBar';
import {XMarkIcon} from '@heroicons/react/24/solid';
import {
  ChangeEventHandler,
  FC,
  PropsWithChildren,
  useCallback,
  useRef,
  useState,
} from 'react';
import Button from '@components/common/Button/Button';
import {
  ChevronLeftIcon,
  CheckCircleIcon,
  UserPlusIcon,
} from '@heroicons/react/24/outline';
import {IOrganizationFollowerType} from '@models/organization';
import {addMember} from '@api/organizations/team/actions';
import {Avatar} from '@components/common';
import useSWR from 'swr';
import {UserProfile} from '@models/profile';
import Link from 'next/link';
import {useFormattedLocation} from 'services/formatLocation';
import useInfiniteSWR from 'hooks/useInfiniteSWR/useInfiniteSWR';

interface IFollowerItemProps extends PropsWithChildren {
  follower: IOrganizationFollowerType;
}
const FollowerItem: FC<IFollowerItemProps> = ({follower, children}) => {
  const {data} = useSWR<UserProfile>(
    `/user/${follower.identity_meta.id}/profile`,
  );
  const location = useFormattedLocation(data);

  return (
    <div className="flex items-center  border-b py-2 px-4">
      <Link href={`/app/user/${follower.identity_meta.username}`}>
        <a>
          <Avatar size="l" src={follower.identity_meta.avatar} />
        </a>
      </Link>
      <div className="flex grow flex-col p-1 px-3">
        <Link href={`/app/user/${follower.identity_meta.username}`}>
          <a>
            <p>{follower.identity_meta.name}</p>
            <p className="text-sm text-gray-500">{location}</p>
          </a>
        </Link>
      </div>
      <div>{children}</div>
    </div>
  );
};

interface INewMemberModalProps {
  open: boolean;
  orgId: string;
  memberIds: Array<string>;
  onClose: () => void;
  onAddNewMember: () => void;
}

const NewMemberModal: FC<INewMemberModalProps> = ({
  open,
  orgId,
  memberIds,
  onClose,
  onAddNewMember,
}) => {
  const [step, setStep] = useState<number>(1);
  const [role, setRole] = useState<UserRole>('admin');
  const [selectedUser, setSelectedUser] = useState<IOrganizationFollowerType>();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const usersBoxRef = useRef<HTMLDivElement>(null);

  const {
    flattenData: users,
    seeMore: hasMore,
    loadMore,
  } = useInfiniteSWR<IOrganizationFollowerType>(
    searchTerm.trim().length
      ? `/follows/followers?type=users&name=${searchTerm.trim()}`
      : `/follows/followers?type=users`,
    {shouldRetryOnError: false},
  );

  const onScroll = useCallback(() => {
    if (!usersBoxRef?.current || !hasMore) return;
    const {scrollTop, scrollHeight, clientHeight} = usersBoxRef.current;
    if (Math.floor(scrollTop) === scrollHeight - clientHeight) {
      loadMore();
    }
  }, [loadMore, hasMore]);

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
        <>
          <div className="p-3">
            <span
              className="absolute right-3 cursor-pointer "
              onClick={onClose}
            >
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
                  placeholder="Search connections"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div
                className="overflow-y-auto"
                ref={usersBoxRef}
                onScroll={onScroll}
              >
                <div className="flex h-80 flex-col">
                  {users?.map(
                    (item, index) =>
                      !memberIds.includes(item.identity_meta.id) && (
                        <FollowerItem
                          key={`m-${item.identity_meta.id}-${index}`}
                          follower={item}
                        >
                          <span
                            className="cursor-pointer"
                            onClick={() => onAddMember(item)}
                          >
                            <UserPlusIcon className="w-6" />
                          </span>
                        </FollowerItem>
                      ),
                  )}
                  <div></div>
                </div>
              </div>
            </Modal.Description>
          </div>
        </>
      )}
      {step === 2 && (
        <ConfirmUserRole
          user={selectedUser}
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
  user: IOrganizationFollowerType | undefined;
  role: UserRole;
  onConfirmRole: (role: UserRole) => void;
  onClose: () => void;
  onClickBack: () => void;
  onConfirm: () => void;
}
const ConfirmUserRole: FC<IConfirmUserRole> = ({
  user,
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
              Add {user?.identity_meta.name} as a...
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
