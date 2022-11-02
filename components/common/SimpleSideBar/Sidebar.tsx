import Router from 'next/router';
import {twMerge} from 'tailwind-merge';

type SideBarProps = {
  title: string | JSX.Element;
  url?: string;
  className?: string;
};

const SideBar = ({url, title, className}: SideBarProps) => {
  return (
    <div
      className={twMerge('hidden lg:flex lg:w-2/6', className && className)}
      aria-label="Sidebar"
    >
      <div
        className={twMerge(
          'flex h-12 w-full items-center rounded-lg border bg-white px-4',
          url && 'cursor-pointer',
        )}
        onClick={() => url && Router.push(url)}
      >
        <p className="text-lg font-medium">{title}</p>
      </div>
    </div>
  );
};

export default SideBar;
