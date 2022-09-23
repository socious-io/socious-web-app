import {twMerge} from 'tailwind-merge';

interface Props {
  backColor: string;
  textColor: string;
  title: string;
}

function TextBoxGray({backColor, textColor, title}: Props) {
  return (
    <div
      className={twMerge(
        'flex w-full w-full items-center rounded-2xl bg-offWhite p-4',
        backColor,
      )}
    >
      <p className={twMerge('justify  font-normal text-black', textColor)}>
        {title}
        <span className="text-success"> See more...</span>
      </p>
    </div>
  );
}

export default TextBoxGray;
