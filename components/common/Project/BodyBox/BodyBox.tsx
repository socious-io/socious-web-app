import {useState} from 'react';
import Markdown from 'markdown-to-jsx';
import {twMerge} from 'tailwind-merge';

interface Props {
  title?: string;
  description: string;
  className?: string;
  minCount?: number;
}

function BodyBox({title, description, className, minCount = 500}: Props) {
  const [showMore, setShowMore] = useState<boolean>(false);

  return (
    <div
      className={twMerge('flex w-full flex-col p-4', className && className)}
    >
      {title && <label className="font-semibold text-black">{title}</label>}
      {description?.length > minCount ? (
        <p>
          {!showMore ? (
            <Markdown options={{wrapper: 'article'}}>
              {description?.slice?.(0, minCount)}
            </Markdown>
          ) : (
            <Markdown options={{wrapper: 'article'}}>{description}</Markdown>
          )}
          {!showMore ? (
            <span
              className="cursor-pointer text-secondary"
              onClick={() => setShowMore(true)}
            >
              ...See more
            </span>
          ) : (
            <span
              className="cursor-pointer text-secondary"
              onClick={() => setShowMore(false)}
            >
              Show less
            </span>
          )}
        </p>
      ) : (
        <Markdown options={{wrapper: 'article'}}>{description}</Markdown>
      )}
    </div>
  );
}

export default BodyBox;
