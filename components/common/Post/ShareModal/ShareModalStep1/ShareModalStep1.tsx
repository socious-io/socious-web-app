import React, {useCallback, useEffect, useState} from 'react';
import {
  Modal,
  SearchBar,
  Button,
  Avatar,
  SocialShareBar,
} from 'components/common';
import {ShareIcon} from '@heroicons/react/24/outline';

import useSWR from 'swr';
import {get} from 'utils/request';

interface ShareModalStep1Props {
  onCopied: () => void;
  onShare: () => void;
}

export const ShareModalStep1 = ({onCopied, onShare}: ShareModalStep1Props) => {
  const [connections, setConnections] = useState<any[]>([]);
  const {data: response} = useSWR<any>('/follows/followings', get);

  useEffect(() => {
    if (response && response.items) {
      setConnections(() => response.items.filter((item: any) => item?.mutual));
    }
  }, [response]);

  const onChange = useCallback(
    (name: string) => {
      if (name) {
        get(`/follows/followings?name=${name}`).then((res: any) => {
          setConnections(() => res.items.filter((item: any) => item?.mutual));
        });
      } else {
        setConnections(() =>
          response.items.filter((item: any) => item?.mutual),
        );
      }
    },
    [response],
  );

  return (
    <div className="-ml-6 -mr-6">
      <Modal.Description>
        <SearchBar
          className="m-4"
          onChange={(e) => onChange(e.currentTarget.value)}
        />
        <h3 className="p-4 text-xl font-semibold text-grayDisableButton">
          Share
        </h3>
        <Button
          variant="link"
          className="align-center flex w-full space-x-4 rounded-none border-y-[0.5px] border-offsetColor bg-background p-4 text-base text-black hover:text-secondaryDark"
          onClick={onShare}
        >
          <ShareIcon className="w-5" />
          <span>Share posts</span>
        </Button>
        <h3 className="p-4 text-xl font-semibold text-grayDisableButton">
          Share elsewhere
        </h3>
        <SocialShareBar onCopied={onCopied} />
        <h3 className="p-4 text-xl font-semibold text-grayDisableButton">
          Connections
        </h3>
        <div className="divide-y-[0.5px] border-y-[0.5px] border-offsetColor ">
          {connections.length > 0 ? (
            connections.map((connection: any) => (
              <div
                className="flex items-center space-x-2 py-[10px] px-4"
                key={connection.id}
              >
                <Avatar src={connection.identity_meta.avatar} size="l" />
                <div>
                  <p>{connection.identity_meta.name}</p>
                  <p className="text-graySubtitle">
                    {connection.identity_meta.location ?? 'Location'}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center space-x-2 py-[10px] px-4">
              User not found.
            </div>
          )}
        </div>
      </Modal.Description>
    </div>
  );
};

export default ShareModalStep1;
