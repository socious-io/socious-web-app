import {useState} from 'react';
import Markdown from 'markdown-to-jsx';

interface Props {
  title: string;
  description: string;
}

function BodyBox({title, description}: Props) {
  const [showMore, setShowMore] = useState<boolean>(false);

  return (
    <div className="flex w-full flex-col p-4">
      <label className="font-semibold text-black">{title}</label>
      {description?.length > 500 ? (
        <p>
          {!showMore ? (
            <Markdown options={{wrapper: 'article'}}>
              {description?.slice?.(0, 500)}
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
