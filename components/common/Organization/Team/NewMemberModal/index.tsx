import Image from 'next/image';
import Modal from '@components/common/Modal/Modal';
import SearchBar from '@components/common/SearchBar/SearchBar';
import {XMarkIcon} from '@heroicons/react/24/solid';
import {FC} from 'react';
import {IUserType} from '..';
import Avatar from '@components/common/Avatar/Avatar';
import Button from '@components/common/Button/Button';
import MemberItem from '../MemberItem';
const AddTeamMember = require('@icons/AddTeamMember.svg');

interface IProps {
  open: boolean;
  onClose: () => void;
  users: Array<IUserType>;
}

const NewMemberModal: FC<IProps> = ({open, users, onClose}) => {
  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      className="-m-4 h-screen w-screen rounded-none p-0 sm:m-0 sm:h-auto sm:rounded-2xl"
    >
      <div className="p-3">
        <span className="absolute right-3 cursor-pointer " onClick={onClose}>
          <XMarkIcon className="w-6" />
        </span>
      </div>
      <Modal.Title>
        <p className="min-h-[30px] text-center">Add members</p>
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
                    <span className="cursor-pointer">
                      <Image
                        src={AddTeamMember}
                        alt="add new member icon"
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
    </Modal>
  );
};

export default NewMemberModal;
