import Link from 'next/link';
import Image from 'next/image';

const imgUserSrc = require('../../../../asset/icons/userWithBorder.svg');

function PostData({}) {
  return (
    <div className="mt-4  flex justify-between rounded-2xl bg-offWhite p-4">
      <dt className=" flex font-medium text-gray-900">Post date</dt>
      <div className="flex flex-row items-center ">
        <div className="relative  h-6 w-6 ">
          <Link href="/">
            <a>
              <Image
                src={imgUserSrc}
                className="fill-warning"
                alt="socious logo"
                layout="fill" // required
              />
            </a>
          </Link>
        </div>
        <div className="relative -ml-2  h-6 w-6 ">
          <Link href="/">
            <a>
              <Image
                src={imgUserSrc}
                className="fill-warning"
                alt="socious logo"
                layout="fill" // required
                width={24}
                height={24}
              />
            </a>
          </Link>
        </div>
        <div className="relative -ml-2  h-6 w-6 ">
          <Link href="/">
            <a>
              <Image
                src={imgUserSrc}
                className="fill-warning"
                alt="socious logo"
                layout="fill" // required
                width={32}
                height={32}
              />
            </a>
          </Link>
        </div>
        <dd className="ml-2 text-sm text-secondary">3+</dd>
      </div>
    </div>
  );
}

export default PostData;
