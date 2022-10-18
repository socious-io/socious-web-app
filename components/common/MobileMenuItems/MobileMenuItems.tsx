import React from 'react';
import Link from 'next/link';
import { Menu } from '@headlessui/react';
import { LoginIdentity } from '@models/identity';
import { changeIdentity } from '@api/identity/actions';
import { getOrganization } from '@api/organizations/actions';
import { RectangleGroupIcon, DocumentTextIcon, FolderIcon, WalletIcon, BellIcon, ArrowRightOnRectangleIcon, XMarkIcon, PencilSquareIcon, DocumentIcon, NoSymbolIcon, UserMinusIcon, UserCircleIcon, UserGroupIcon, UsersIcon } from '@heroicons/react/24/outline';
import Avatar from '../Avatar/Avatar';
import { useUser } from '@hooks';
import { useRouter } from 'next/router';
import Button from '@components/common/Button/Button';
import { TERM_URL, PRIVACY_URL } from 'utils/api';

type Props = {
  editProfile?: () => void;
  onLogout?: () => void;
};

const MobileMenuItems: React.FC<Props> = ({ editProfile, onLogout }) => {
  const router = useRouter();
  const { currentIdentity, user, mutateIdentities, mutateUser, identities } = useUser({
    redirect: false,
  });
  const isUser = currentIdentity?.type === 'users' ? true : false;


  const onSwitchIdentity = async (identity: LoginIdentity) => {
    try {
      await changeIdentity(identity.id);
      mutateIdentities();
      mutateUser();
      if (identity.type === 'organizations') {
        await getOrganization(identity.id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSeePolicy = () => {
    // TODO detect current language
    window.open(PRIVACY_URL('en_US'));
  };

  const handleSeeTerms = () => {
    // TODO detect current language
    window.open(TERM_URL('en_US'));
  };

  return (
    <React.Fragment>
      <Menu.Button className="float-right"><XMarkIcon className="w-8" /></Menu.Button>

      <div className="flex items-center my-5">
        <Avatar
          size="xl"
          type={currentIdentity?.type}
          src={
            currentIdentity?.type === 'users'
              ? currentIdentity?.meta?.avatar
              : currentIdentity?.meta?.image
          }
        />
        <div className="ml-3">
          <h3>{currentIdentity?.type === 'users' ? `${user?.first_name} ${user?.last_name}` : user?.name}</h3>
          <Link
            href={`/app/${isUser ? 'user' : 'organization'}/${isUser ? user?.username : user?.shortname}`}
            passHref
          >
            <label className="cursor-pointer text-primary">
              View my profile
            </label>
          </Link>
        </div>
      </div>
      {currentIdentity?.type === 'organizations' &&

        <div className="border-t border-gray-300 py-4">
          <h5 className="text-base mb-3 text-blue-900">Organizations</h5>
          <ul>
            <li className="mb-3">
              <Link
                href={`/app/organization/${user?.username}`}
                passHref
              >
                <a className="text-black flex items-center">
                  <UserCircleIcon className="w-5 mr-3" />
                  Profile
                </a>
              </Link>
            </li>
            <li className="mb-3">
              <Link
                href={`/app/team`}
                passHref
              >
                <a className="text-black flex items-center">
                  <UserGroupIcon className="w-5 mr-3" />
                  Team
                </a>
              </Link>
            </li>
            <li className="mb-3">
              <Link
                href={``}
                passHref
              >
                <a className="text-black flex items-center">
                  <UsersIcon className="w-5 mr-3" />
                  Followers
                </a>
              </Link>
            </li>
          </ul>
        </div>}

      <div className="border-t border-gray-300 py-4">
        <h5 className="text-base mb-3 text-blue-900">Projects</h5>
        <ul>
          <li className="mb-3">
            <Link
              href={`/app/projects`}
              passHref
            >
              <a className="text-black flex items-center">
                <WalletIcon className="w-5 mr-3" />
                All projects
              </a>
            </Link>
          </li>
          <li className="mb-3">
            <Link
              href={`/app/projects/applications/${user?.username}`}
              passHref
            >
              <a className="text-black flex items-center">
                <DocumentTextIcon className="w-5 mr-3" />
                My applications
              </a>
            </Link>
          </li>
          <li>
            <Link
              href={`/app/projects/hired/${user?.username}`}
              passHref
            >
              <a className="text-black flex items-center">
                <FolderIcon className="w-5 mr-3" />
                Hired projects
              </a>
            </Link>
          </li>
        </ul>
      </div>

      <div className="border-t border-gray-300 py-4">
        <h5 className="text-base mb-3 text-blue-900">Notifications</h5>
        <ul>
          <li className="mb-3">
            <Link
              href={`/app/notifications`}
              passHref
            >
              <a className="text-black flex items-center">
                <BellIcon className="w-5 mr-3" />
                Notifications
              </a>
            </Link>
          </li>
        </ul>
      </div>

      <div className="border-t border-gray-300 py-4">
        <h5 className="text-base mb-3 text-blue-900">Switch to</h5>
        <ul>
          <li className="mb-3">
            {identities && identities.length > 0 && (
              identities.map(
                (identity: LoginIdentity) =>
                  !identity.current && (
                    <div
                      key={identity?.meta?.id}
                      className="my-2 flex w-52 cursor-pointer flex-row items-center px-4 hover:bg-primary hover:text-offWhite"
                      onClick={() => onSwitchIdentity(identity)}
                    >
                      <div className="w-1/4">
                        <Avatar
                          size="m"
                          type={identity.type}
                          src={
                            identity.type === 'users'
                              ? identity?.meta?.avatar
                              : identity?.meta?.image
                          }
                        />
                      </div>
                      <div className="w-3/4">
                        {identity?.meta?.name}
                      </div>
                    </div>
                  ))
            )}
          </li>
          {(identities?.filter((x) => x.type == "organizations"))?.length == 0 && <li>
            <Link href="/app/organization/+new" passHref>
              <a className="text-black flex items-center">
                <RectangleGroupIcon className="w-5 mr-3" />
                Add Organization
              </a>
            </Link>
          </li>}
        </ul>
      </div>

      <div className="border-t border-gray-300 py-4">
        <h5 className="text-base mb-3 text-blue-900">Settings</h5>
        <ul>
          <li className="mb-3">
            <Button onClick={() => editProfile && editProfile()} className="text-black flex items-center bg-transparent p-0 font-normal">
              <PencilSquareIcon className="w-5 mr-3" />
              Edit profile
            </Button>
          </li>
          <li className="mb-3">
            <Button onClick={() => handleSeeTerms()} className="text-black flex items-center bg-transparent p-0 font-normal">
              <DocumentIcon className="w-5 mr-3" />
              Privacy policy
            </Button>
          </li>
          <li className="mb-3">
            <Button onClick={() => handleSeePolicy()} className="text-black flex items-center bg-transparent p-0 font-normal">
              <DocumentIcon className="w-5 mr-3" />
              Terms &amp; conditions
            </Button>
          </li>
          <li className="mb-3">
            <Link
              href={``}
              passHref
            >
              <a className="text-black flex items-center">
                <NoSymbolIcon className="w-5 mr-3" />
                Blocking account
              </a>
            </Link>
          </li>
          <li className="mb-3">
            <Link
              href={``}
              passHref
            >
              <a className="text-black flex items-center">
                <UserMinusIcon className="w-5 mr-3" />
                Delete account
              </a>
            </Link>
          </li>
        </ul>
      </div>

      <div className="border-t border-gray-300 py-4">
        <ul>
          <li className="mb-3">
            <button className="text-black flex items-center text-red-600" onClick={onLogout}>
              <ArrowRightOnRectangleIcon className="w-5 mr-3" />
              Logout
            </button>
          </li>
        </ul>
      </div>

    </React.Fragment>
  )
}
export default MobileMenuItems;
