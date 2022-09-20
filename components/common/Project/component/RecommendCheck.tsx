import Link from 'next/link';
import Image from 'next/image';
const dislikeSrc = require('../../../../asset/icons/thumbs-dislike_white.svg');
const likeSrc = require('../../../../asset/icons/thumbs-like.svg');

interface PostsProps {
  page: number;
  onFull: () => void;
}

const RecommendCheck = () => {
  return (
    <div className=" my-4  flex h-[72px] w-full flex-row items-center justify-between rounded-2xl bg-secondary  px-4 md:px-7">
      <p className=" font-medium text-background">
        Are you satisfied with the jobs being recommended?
      </p>
      <div className="flex flex-row  items-center">
        <div className=" relative h-5  w-5 ">
          <Link href="/">
            <a>
              <Image
                src={dislikeSrc}
                alt="dislike"
                layout="fill" // required
                width={20}
                height={20}
              />
            </a>
          </Link>
        </div>
        <div className=" relative ml-7 h-5 w-5 ">
          <Link href="/">
            <a>
              <Image
                src={likeSrc}
                alt="like"
                layout="fill" // required
                width={24}
                height={24}
              />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecommendCheck;
