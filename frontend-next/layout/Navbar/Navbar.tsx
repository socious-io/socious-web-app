import {CogIcon} from '@heroicons/react/outline';
import {ReactComponent as Logo} from '../../asset/icons/logo.svg';
import {useContext} from "react";
import Link from 'next/link';
import {Avatar} from '../../components/common/Avatar/Avatar';
import {TextInput} from '../../components/common/TextInput/TextInput';

const imgSrc = require('../../asset/icons/Base.svg');
const imgLikeSrc = require('../../asset/icons/likes.svg');

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

  return (
    <div className="flex h-60 w-full items-center rounded-b-sm bg-primary bg-[url('/images/socious_feed.png')] bg-cover  md:flex md:h-16  md:bg-none lg:h-16  ">
    <nav className="h-60 w-full items-center md:flex md:h-16  md:bg-none lg:h-16 ">  
        <div className="container mx-auto max-w-5xl ">
          <div className="flex flex items-center justify-center space-x-4">
            <div className="flex-row-2 ml-4 mr-4 mt-8 flex items-center justify-items-center md:ml-0 md:mt-0">
              <div className="flex flex-wrap content-around">
                <div className="items-center rounded-full ">
                  <div className="relative  h-8 w-8  ">
                    <Link href="/">
                      <a>
                        <Image
                          src={imgSrc}
                          className="fill-warning"
                          alt="socious logo"
                          layout="fill" // required
                          width={32}
                          height={32}
                        />
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="space-between ml-2 mr-2 flex items-center ">
                <TextInput className="w-72 rounded-full py-1.5" />
              </div>
              <div className="items-center ">
                <div className="relative h-6 w-6 md:hidden">
                  <Link href="/">
                    <a>
                      <Image
                        src={imgLikeSrc}
                        className="fill-warning"
                        alt="likes"
                        layout="fill" // required
                      />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
            <div className="hidden w-4/6 items-center justify-end space-x-6 md:flex">
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
                <Link href="/notifications" passHref>
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
     
    </nav>
    </div>
  );
};
export default Navbar;
