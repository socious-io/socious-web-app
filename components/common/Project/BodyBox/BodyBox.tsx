import {useState} from 'react';

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
        <p className=" mt-3 font-normal text-black">
          {!showMore ? `${description?.slice(0, 500)}...` : `${description}...`}

          {!showMore ? (
            <span
              className="cursor-pointer text-secondary"
              onClick={() => setShowMore(true)}
            >
              See more
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
        <p>{description}</p>
      )}
    </div>
  );
}

export default BodyBox;
