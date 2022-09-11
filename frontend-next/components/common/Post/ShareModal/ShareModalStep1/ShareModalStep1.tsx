import React, { useCallback, useEffect, useState } from 'react';
import { Modal, SearchBar, Button, Avatar, SocialShareBar } from 'components/common';
import { ShareIcon } from '@heroicons/react/outline';

import useSWR from 'swr';
import { get } from 'utils/request';

interface ShareModalStep1Props {
  onCopied: () => void;
  onShare: () => void;
}

export const ShareModalStep1 = ({
  onCopied,
  onShare
}: ShareModalStep1Props) => {

  const [connections, setConnections] = useState<any[]>([]);
  const { data: response } = useSWR<any>("/api/v2/follows/followings", get);

  useEffect(() => {
    if (response && response.items) {
      setConnections(() => response.items.filter((item: any) => item?.mutual))
    }
  }, [response]);
  
  const onChange = useCallback((name: string) => {
    if (name) {
      get(`/api/v2/follows/followings?name=${name}`)
        .then((res: any) => {
          setConnections(() => res.items.filter((item: any) => item?.mutual))
        });
    } else {
      setConnections(() => response.items.filter((item: any) => item?.mutual))
    }
  }, [response])

  return (
    <div className='-ml-6 -mr-6'>
      <Modal.Description>
        <SearchBar
          className='m-4'
          onChange={(e) => onChange(e.currentTarget.value)}
        />
        <h3 className="text-xl text-grayDisableButton font-semibold p-4">Share</h3>
        <Button
          variant='link'
          className="p-4 bg-background rounded-none border-y-[0.5px] border-offsetColor w-full text-black text-base space-x-4 flex align-center hover:text-secondaryDark"
          onClick={onShare}
        >
          <ShareIcon className='w-5'/>
          <span>
            Share posts
          </span>
        </Button>
        <h3 className="text-xl text-grayDisableButton font-semibold p-4">Share elsewhere</h3>
        <SocialShareBar onCopied={onCopied} />
        <h3 className="text-xl text-grayDisableButton font-semibold p-4">Connections</h3>
        <div className='border-y-[0.5px] border-offsetColor divide-y-[0.5px] '>
          { connections.length > 0 ?
            connections.map((connection: any) => (
              <div className='py-[10px] px-4 space-x-2 flex items-center' key={connection.id}>
                <Avatar src={connection.identity_meta.avatar} size="l"/>
                <div>
                  <p>{connection.identity_meta.name}</p>
                  <p className='text-graySubtitle'>{connection.identity_meta.location ?? "Location"}</p>
                </div>
              </div>
          ))
          :
          <div className='py-[10px] px-4 space-x-2 flex items-center'>
            User not found.
          </div>
          }
        </div>
      </Modal.Description>  
    </div>
  );
};

export default ShareModalStep1;