import Avatar from '@components/common/Avatar/Avatar';
import Modal from '@components/common/Modal/Modal';
import SearchBar from '@components/common/SearchBar/SearchBar';
import {XMarkIcon} from '@heroicons/react/24/solid';
import {useToggle} from '@hooks';
import {useRouter} from 'next/router';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import useSWR from 'swr';
import {get} from 'utils/request';
import {SideBar} from '../SideBar/SideBar';

// type
interface ChatLayoutProps {
  children: (handleRefresh?: any) => React.ReactNode;
  page: string;
}
const ChatLayout = ({children, page}: ChatLayoutProps) => {
  const router = useRouter();
  const sideBarRefresh = useRef<any>(null);
  const [query, setQuery] = useState<string>('');
  const [mutualConnections, setMutualConnections] = useState<any[]>([]);

  const {state: addState, handlers: addHandlers} = useToggle();

  // Mutates chats on sidebar when chat open.
  const handleRefresh = useCallback(() => {
    return sideBarRefresh?.current?.refresh();
  }, []);

  const {data: connectionsData, error: connectionsError} = useSWR<any>(
    `/follows/followings?page=1&name=${query}`,
    get,
  );

  useEffect(() => {
    if (connectionsData?.items)
      setMutualConnections(() =>
        connectionsData?.items?.filter((item: any) => item?.mutual),
      );
  }, [connectionsData]);

  return (
    <div className="h-full sm:mt-10 sm:flex sm:space-x-4 sm:px-4">
      <SideBar
        ref={sideBarRefresh}
        page={page}
        toggleAddChat={addHandlers.on}
      />
      {children(handleRefresh)}

      {/* Modal */}
      <Modal
        isOpen={addState}
        onClose={addHandlers.off}
        className="-m-4 h-screen w-screen rounded-none sm:m-0 sm:h-auto sm:rounded-2xl"
      >
        <span
          className="absolute right-3 cursor-pointer "
          onClick={() => addHandlers.off()}
        >
          <XMarkIcon className="w-6" />
        </span>
        <Modal.Title>
          <h2 className="min-h-[30px] text-center">Create Chat</h2>
        </Modal.Title>

        <div className="-ml-6 -mr-6">
          <Modal.Description>
            <div className="flex h-full flex-col">
              <SearchBar
                className="m-4"
                onChange={(e) =>
                  setQuery(e?.currentTarget?.value ?? (e?.target?.value || ''))
                }
              />
              <h3 className="p-4 text-xl font-semibold text-grayDisableButton">
                Connections
              </h3>
              <div className=" h-[calc(100vh_-_14rem)] overflow-y-auto border-y-[0.5px] border-offsetColor sm:h-[20rem]">
                {mutualConnections.length > 0 ? (
                  mutualConnections.map((connection: any) => (
                    <div
                      className="flex items-center space-x-2 border-b-[0.5px] border-offsetColor py-[10px] px-4"
                      key={connection.id}
                      onClick={() =>
                        router.push(
                          `/app/chat/create/${connection?.identity_id}?name=${connection?.identity_meta?.name}`,
                        )
                      }
                    >
                      <Avatar src={connection.identity_meta.avatar} size="l" />
                      <div>
                        <p>{connection.identity_meta.name}</p>
                        {connection.identity_meta?.location && (
                          <p className="text-graySubtitle">
                            {connection.identity_meta.location}
                          </p>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center space-x-2 py-[10px] px-4">
                    User not found.
                  </div>
                )}
              </div>
            </div>
          </Modal.Description>
        </div>
      </Modal>
    </div>
  );
};

export default ChatLayout;
