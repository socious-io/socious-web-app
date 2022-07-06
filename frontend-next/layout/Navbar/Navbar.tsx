import { CogIcon } from "@heroicons/react/outline";
import { ReactComponent as Logo } from "../../asset/icons/logo.svg";

import Link from "next/link";
import { Avatar } from "../../components/common/Avatar/Avatar";
import { TextInput } from "../../components/common/TextInput/TextInput";

function Navbar() {
  return (
    <nav className="flex items-center w-full rounded-b-sm bg-primary h-16">
      <div className="w-full">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center space-x-4">
            <div className="flex items-center w-2/6 space-x-6">
              <div>
                <Link href="/">
                  <a>
                    <Logo className="text-white fill-current" />
                  </a>
                </Link>
              </div>
              <div className="flex space-between items-center">
                <TextInput styleClass="py-1.5 w-72" />
              </div>
            </div>
            <div className="flex items-center justify-end w-4/6 space-x-6">
              <div className="space-x-4">
                <a className="text-sm text-white" href="/">
                  Home
                </a>
                <a className="text-sm text-white" href="/">
                  Network
                </a>
                <a className="text-sm text-white" href="/">
                  Chats
                </a>
                <a className="text-sm text-white" href="/">
                  Notifications
                </a>
                <a className="text-sm text-white" href="/">
                  Projects
                </a>
              </div>
              <div className="flex space-between items-center space-x-3">
                <Avatar size="m" />
                <CogIcon className="text-white  h-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
