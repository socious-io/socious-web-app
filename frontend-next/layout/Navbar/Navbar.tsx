import {CogIcon} from '@heroicons/react/outline';
import {ReactComponent as Logo} from '../../asset/icons/logo.svg';
import {useContext} from 'react';
import Link from 'next/link';
import {Avatar} from '../../components/common/Avatar/Avatar';
import {TextInput} from '../../components/common/TextInput/TextInput';

import Image from 'next/image';
import {Dropdown} from '@components/common';
import {useUser} from '@hooks';
import {changeIdentity} from '@api/identity/actions';
import {LoginIdentity} from '@models/identity';
import {getOrganization} from '@api/organizations/actions';
import {logout} from '@api/auth/actions';
import Router from 'next/router';

const Navbar = () => {
  const {currentIdentity, identities, mutateIdentities, mutateUser} = useUser();

  const onSwitchIdentity = async (identity: LoginIdentity) => {
    try {
      await changeIdentity(identity.id);
      mutateIdentities();
      if (identity.type === 'organizations') {
        await getOrganization(identity.id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onLogout = async () => {
    const res = await logout();
    mutateIdentities();
    mutateUser();
    if (res) Router.push('/');
  };

  const imgSrc = require('../../asset/icons/logo.svg');

  return (
    <nav className="md:flex items-center w-full rounded-b-sm bg-primary h-16 hidden ">
      <div className="w-full">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center space-x-4">
            <div className="flex items-center w-2/6 space-x-6">
              <div>
                <Link href="/">
                  <a>
                    <Image
                      src={imgSrc}
                      className="fill-warning"
                      alt="socious logo"
                      width={'100%'}
                      height={'100%'}
                    />
                  </a>
                </Link>
              </div>
              <div className="flex space-between items-center">
                <TextInput className="py-1.5 w-72 rounded-full" />
              </div>
            </div>
            <div className="flex items-center justify-end w-4/6 space-x-6">
              <div className="space-x-4">
                <Link href="/" passHref>
                  <span className="text-sm text-white">Home</span>
                </Link>
                <Link href="/" passHref>
                  <span className="text-sm text-white">Network</span>
                </Link>
                <Link href="/" passHref>
                  <span className="text-sm text-white">Chats</span>
                </Link>
                <Link href="/" passHref>
                  <span className="text-sm text-white">Notifications</span>
                </Link>
                <Link href="/" passHref>
                  <span className="text-sm text-white">Projects</span>
                </Link>
              </div>
              <div className="flex space-between items-center space-x-3">
                <Dropdown
                  display={
                    <Avatar size="m" src={currentIdentity?.meta?.avatar} />
                  }
                >
                  {identities &&
                    identities.length > 0 &&
                    identities.map(
                      (identity: LoginIdentity) =>
                        !identity.current && (
                          <div
                            key={identity?.meta?.id}
                            className="flex flex-row items-center w-52 p-4 cursor-pointer hover:bg-primary my-4 hover:text-offWhite"
                            onClick={() => onSwitchIdentity(identity)}
                          >
                            <div className="w-1/4">
                              <Avatar
                                size="m"
                                src={
                                  identity.type === 'users'
                                    ? identity?.meta?.avatar
                                    : identity?.meta?.image
                                }
                              />
                            </div>
                            <div className="w-3/4">{identity?.meta?.name}</div>
                          </div>
                        ),
                    )}
                  <div className="p-4 cursor-pointer" onClick={onLogout}>
                    <b>LOGOUT</b>
                  </div>
                </Dropdown>
                <CogIcon className="text-white  h-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
