import {getText} from '@socious/data';
import Image from 'next/future/image';
import {Chip} from '@components/common';

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
  console.log('MEDIA :---: ', media);
  return (
    <div
      className={
        noBorder ? '' : `rounded-2xl border border-grayLineBased bg-white p-4`
      }
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
        <Chip
          content={getText('en', `PASSION.${passion}`) || passion}
          containerClassName="bg-secondarySLight inline-block mb-4 mt-2"
          contentClassName="text-secondary"
        />
      )}
      <div>
        <p className="text-small">
          {content ??
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime cupiditate amet perspiciatis blanditiis tempore tempora obcaecati? Eum id excepturi, corrupti vel vitae, quidem perferendis atque, illum odio aperiam eveniet pariatur.'}
        </p>
      </div>
    </div>
  );
};

export default PostContent;
