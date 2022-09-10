import { Chip } from "@components/common";

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
}: PostContentProps
) => {
  console.log("passion", passion);
  return (
    <div className={noBorder ? "" : `p-4 rounded-2xl border border-grayLineBased bg-white`}>
      {media && media.length > 0 &&
        <div>
          <div className="w-full h-40 bg-offWhite rounded-lg" />
        </div>
      }
      {
        passion &&
        <div>
          <Chip content={passion} containerClassName="bg-secondarySLight inline" contentClassName="text-secondary" />
        </div>
      }
      <div>
        <p className="text-small">{content ?? 
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime cupiditate amet perspiciatis blanditiis tempore tempora obcaecati? Eum id excepturi, corrupti vel vitae, quidem perferendis atque, illum odio aperiam eveniet pariatur."
        }</p>
      </div>
    </div>
  );
};

export default PostContent;