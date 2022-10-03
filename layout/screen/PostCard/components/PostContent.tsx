import {getText} from '@socious/data';
import Image from 'next/future/image';
import {Chip} from '@components/common';
import {twMerge} from 'tailwind-merge';

export interface PostContentProps {
  passion?: string;
  content?: string;
  noBorder?: boolean;
  media?: string[] | null;
}

const PostContent = ({
  passion,
  content,
  noBorder = false,
  media = [],
}: PostContentProps) => {
  return (
    <div
      className={twMerge(
        'space-y-4',
        noBorder ? '' : `rounded-2xl border border-grayLineBased bg-white p-4`,
      )}
    >
      {media && media.length > 0 && (
        <div className="relative h-40 w-full overflow-hidden rounded-lg bg-offWhite">
          <Image
            alt={passion ?? 'post media'}
            src={media[0]}
            className="object-cover"
            fill
          />
        </div>
      )}
      {passion && (
        <div className="mb-3">
          <Chip
            content={getText('en', `PASSION.${passion}`) || passion}
            containerClassName="bg-secondarySLight inline-block"
            contentClassName="text-secondary"
          />
        </div>
      )}
      <div>
        <p className="text-small break-words">{content}</p>
      </div>
    </div>
  );
};

export default PostContent;
