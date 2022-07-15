import { CogIcon } from "@heroicons/react/outline";
import { ReactComponent as Logo } from "../../asset/icons/logo.svg";

import Link from "next/link";
import { Avatar } from "../../components/common/Avatar/Avatar";
import { TextInput } from "../../components/common/TextInput/TextInput";

function Navbar() {
  const imgSrc = require("../../asset/icons/logo.svg");

  return (
    <nav className="flex items-center w-full rounded-b-sm bg-primary h-16">
      <div className="w-full">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center space-x-4">
            <div className="flex items-center w-2/6 space-x-6">
              <div>
                <Link href="/">
                  <a>
                    <img
                      src={imgSrc}
                      className="fill-warning"
                      alt="socious logo"
                    />
                  </a>
                </Link>
              </div>
              <div className="flex space-between items-center">
                <TextInput styleClass="py-1.5 w-72 rounded-full" />
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
