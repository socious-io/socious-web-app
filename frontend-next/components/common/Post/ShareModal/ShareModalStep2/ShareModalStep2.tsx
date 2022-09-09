import { Modal, SearchBar, Button, Avatar, SocialShareBar } from 'components/common';
import { ShareIcon } from '@heroicons/react/outline';


interface shareModalStep2Props {
  onShare: () => void;
}

export const ShareModalStep2 = ({

  onShare
}: shareModalStep2Props) => {
  const connections: any[] = [];
  const onCopied = () => {}

  return (
    <div className='-ml-6 -mr-6'>
      <Modal.Description>
        <SearchBar
          className='m-4'
          // onChange={(e) => onChange(e.currentTarget.value)}
        />
        <h3 className="text-xl text-grayDisableButton font-semibold p-4">Share</h3>
        <Button
          variant='link'
          className="p-4 bg-background rounded-none border-y-[0.5px] border-offsetColor w-full text-black text-base space-x-4 flex align-center hover:text-secondaryDark"
        >
          <ShareIcon className='w-5'/>
          <span>
            Share posts
          </span>
        </Button>
        <h3 className="text-xl text-grayDisableButton font-semibold p-4">Share elsewhere</h3>
        <SocialShareBar onCopied={onCopied} />
        <h3 className="text-xl text-grayDisableButton font-semibold p-4">Connections</h3>
        
      </Modal.Description>  
    </div>
  );
};

export default ShareModalStep2;