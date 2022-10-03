/* eslint-disable prettier/prettier */
import {
  FolderIcon,
  ClipboardDocumentListIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import {FC} from 'react';
import Link from 'next/link';

interface SettingsCardProps {
  isOrganization?: boolean;
  username: string;
}

const SettingsCard: FC<SettingsCardProps> = ({
  isOrganization = false,
  username,
}) => {
  return (
    <div className="space-y-4 rounded-2xl border border-grayLineBased bg-background p-4">
      <Link href="/app/projects">
        <label className="text-primary">Settings</label>
      </Link>
      <ul className="list-none space-y-4">
        {isOrganization ? (
          <>
            <Link href={`/app/projects/created/${username}`} passHref>
              <li className="flex items-center space-x-4">
                <UserCircleIcon className="h-4" />
                <p>Created</p>
              </li>
            </Link>
            <li className="flex items-center space-x-4">
              <FolderIcon className="h-4" />
              <p>Archived</p>
            </li>
          </>
        ) : (
          <>
            {/* <Link href={`/app/projects/applications/${username}`} passHref>
              <li className="flex cursor-pointer items-center space-x-4">
                <ClipboardDocumentListIcon className="h-4" />
                <p>Blocking Account</p>
              </li>
            </Link> */}
            <Link href={`/app/settings/delete`} passHref>
              <li className="flex cursor-pointer items-center space-x-4">
                <FolderIcon className="h-4" />
                <p>Delete Account</p>
              </li>
            </Link>
          </>
        )}
      </ul>
    </div>
  );
};

export default SettingsCard;
