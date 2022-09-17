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
  return (
    <div
      className={
        noBorder ? '' : `rounded-2xl border border-grayLineBased bg-white p-4`
      }
    >
      {media && media.length > 0 && (
        <div>
          <div className="h-40 w-full rounded-lg bg-offWhite" />
        </div>
      )}
      {passion && (
        <div>
          <Chip
            content={passion}
            containerClassName="bg-secondarySLight inline"
            contentClassName="text-secondary"
          />
        </div>
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
