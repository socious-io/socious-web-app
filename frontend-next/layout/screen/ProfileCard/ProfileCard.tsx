import {Avatar} from '@components/common';
import Link from 'next/link';

export interface ProfileCardProps {
  content?: string;
  name?: string;
  avatar?: string;
  following?: number;
  followers?: number;
}

export function ProfileCard({
  content,
  name,
  avatar,
  following,
  followers,
}: ProfileCardProps) {
  return (
    <div className="p-4 space-y-4 rounded-2xl border border-grayLineBased">
      <div className="space-y-4">
        <Avatar src={avatar ?? ''} size="xxl" type={1} />
        <div>
          <p className="text-2xl font-semibold">{name || "FirstName LastName"}</p>
          <Link href={'/profile'} passHref>
            <label className="text-primary">View my profile</label>
          </Link>
        </div>
        <div>
          <p className="text-sm">{content}</p>
        </div>
        <div className="flex flex-row space-x-2">
          <div>
            <p className="text-grayInputField">{followers ?? 0} Following</p>
          </div>
          <div>
            <p className="text-grayInputField">{followers ?? 0} Followers</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
