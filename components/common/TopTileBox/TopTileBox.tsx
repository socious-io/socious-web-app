import {twMerge} from 'tailwind-merge';
import Image from 'next/image';

interface Props {
  title: string;
  titleClassname: string;
  backColor: string;
  iconSrc: string;
}

function TopTileBox({title, titleClassname, backColor, iconSrc}: Props) {
  return (
    <div className="w-full pb-4 ">
      <div
        className={twMerge(
          'flex items-center rounded-2xl border border-grayLineBased bg-white p-6',
          backColor,
        )}
      >
        <div className="relative mr-3 h-5 w-5 ">
          <a>
            <Image
              src={iconSrc}
              className="fill-warning"
              alt="dislike"
              layout="fill" // required
            />
          </a>
        </div>
        <p className={twMerge('font-semibold', titleClassname)}>{title}</p>
      </div>
    </div>
  );
}

export default TopTileBox;
