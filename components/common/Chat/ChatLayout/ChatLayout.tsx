import React, {useCallback, useRef} from 'react';
import {SideBar} from '../SideBar/SideBar';

// type
interface ChatLayoutProps {
  children: (handleRefresh?: any) => React.ReactNode;
  page: string;
}
const ChatLayout = ({children, page}: ChatLayoutProps) => {
  const sideBarRefresh = useRef<any>(null);

  const handleRefresh = useCallback(() => {
    return sideBarRefresh?.current?.refresh();
  }, []);

  return (
    <div className="h-full sm:mt-10 sm:flex sm:space-x-4 sm:px-4">
      <SideBar ref={sideBarRefresh} page={page} />
      {children(handleRefresh)}
    </div>
  );
};

export default ChatLayout;
