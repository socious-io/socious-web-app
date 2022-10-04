import Avatar from '@components/common/Avatar/Avatar';
import Button from '@components/common/Button/Button';
import {FC, ReactNode} from 'react';
interface IProp {
  name: string;
  detail: string;
  Extra: ReactNode;
}
const MemberItem: FC<IProp> = ({name, detail, Extra}) => {
  return (
    <div className="flex items-center  border-b py-2 px-4">
      <Avatar size="l" />
      <div className="flex grow flex-col p-1 px-3">
        <p>{name}</p>
        <p className="text-sm text-gray-500">{detail}</p>
      </div>
      <div>{Extra}</div>
    </div>
  );
};
export default MemberItem;
