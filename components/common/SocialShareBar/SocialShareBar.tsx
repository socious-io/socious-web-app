// import {
//   FacebookShareButton,
//   FacebookIcon,
//   LinkedinShareButton,
//   LinkedinIcon,
//   WhatsappShareButton,
//   WhatsappIcon,
//   TelegramShareButton,
//   TelegramIcon,
//   TwitterShareButton,
//   TwitterIcon,
// } from 'next-share';
import {Button} from 'components/common';
import {LinkIcon} from '@heroicons/react/24/outline';
import {useCallback} from 'react';

interface SocialShareBarProps {
  onCopied: () => void;
}

export const SocialShareBar = ({onCopied}: SocialShareBarProps) => {
  const link = window.location.href;
  const copyToClipBoard = useCallback(() => {
    navigator.clipboard.writeText(link).then(() => onCopied());
  }, [link, onCopied]);

  return (
    <div className="no-wrap hide-scrollbar flex space-x-6 overflow-auto border-y-[0.5px] border-offsetColor p-4">
      {/* <Button
        variant='ghost'
        className='bg-transparent inline-block hover:text-primary focus:text-primary p-0'
        onClick={copyToClipBoard}
      >
        <LinkIcon className='w-[48px] p-2' />
        <span className='block whitespace-nowrap text-black text-sm font-normal'>
          Copy link
        </span>
      </Button>

      <FacebookShareButton
        url={link}
      >
        <FacebookIcon size={48} round className='mx-auto'/>
        <span className=' text-sm font-normal'>
          Facebook
        </span>
      </FacebookShareButton>

      <WhatsappShareButton
        url={link}
      >
        <WhatsappIcon size={48} round className='mx-auto'/>
        <span className=' text-sm font-normal'>
          Whatsapp
        </span>
      </WhatsappShareButton>

      <LinkedinShareButton
        url={link}
      >
        <LinkedinIcon size={48} round className='mx-auto'/>
        <span className=' text-sm font-normal'>
          LinkedIn
        </span>
      </LinkedinShareButton>

      <TelegramShareButton
        url={link}
      >
        <TelegramIcon size={48} round className='mx-auto'/>
        <span className=' text-sm font-normal'>
          Telegram
        </span>
      </TelegramShareButton>
      
      <TwitterShareButton
        url={link}
      >
        <TwitterIcon size={48} round className='mx-auto'/>
        <span className=' text-sm font-normal'>
          Twitter
        </span>
      </TwitterShareButton> */}
    </div>
  );
};

export default SocialShareBar;
