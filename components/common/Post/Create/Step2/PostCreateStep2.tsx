import {StepProps} from '@models/stepProps';
import React, {ReactElement, useCallback, useEffect} from 'react';
import {useFormContext} from 'react-hook-form';
import Modal from 'components/common/Modal/Modal';
import Chip from '@components/common/Chip/Chip';
import Avatar from '@components/common/Avatar/Avatar';
import Button from '@components/common/Button/Button';
import Image from 'next/image';
import useUser from 'hooks/useUser/useUser';

interface PostCreateStep2Props extends StepProps {
  file: any | null;
}

const PostCreateStep2 = ({onSubmit, file}: PostCreateStep2Props) => {
  const {handleSubmit, getValues} = useFormContext();
  const social_causes = getValues('causes_tags');
  const content = getValues('content');
  const [url, setUrl] = React.useState<any>('');
  // const link = getValues("link");
  const {user, currentIdentity} = useUser();
  const isUser = currentIdentity?.type === 'users' ? true : false;

  useEffect(() => {
    const reader = new FileReader();
    if (file) {
      reader.onloadend = () => {
        setUrl(reader?.result || '');
      };
      reader.readAsDataURL(file);
    }
  }, [file]);

  const onPreviewDone = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      onSubmit(true);
    },
    [onSubmit],
  );

  return (
    <div>
      <Modal.Title>
        <h2 className="font-worksans mb-4 text-center">Review post</h2>
      </Modal.Title>
      <Modal.Description>
        <div className="-mr-6 -ml-6 border-y-[.5px] p-4">
          <div className="flex items-center space-x-3">
            <Avatar src={user?.avatar?.url} size="m" />
            <span>{isUser ? user?.username : user?.shortname}</span>
          </div>
          <Chip
            containerClassName="bg-secondarySLight inline-block mt-4 mb-6"
            contentClassName="text-secondary font-normal text-sm"
            // content={"apple"}
            content={social_causes}
          />
          <p className={file ? 'min-h-[4rem]' : 'min-h-[8rem]'}>
            {content ||
              ' ipsum dolor sit amet, consectetur adipiscing elit. Nibh aliquet nullam odio maecenas semper. Dui felis suspendisse nunc, in vel enim nunc adipiscing donec. Pellentesque a magna venenatis ut ut semper dictum sit sem. Suspendisse lacus, pulvinar elit ipsum fermentum. Ipsum, orci, faucibus nibh et commodo et, dignissim erat. Adipiscing fusce et fames aliquam condimentum. '}
          </p>
          {/* {link && 
            <p className="my-4">{link}</p>
          } */}
          {url && (
            <div className="mx-auto h-48 w-80 rounded-xl">
              <Image
                src={url}
                width="320px"
                height="192px"
                className="object-cover"
                alt="Image"
              />
            </div>
          )}
        </div>
      </Modal.Description>
      <Button
        className="ml-auto mt-4 flex max-w-xs items-center justify-center align-middle "
        type="submit"
        // size="lg"
        variant="fill"
        value="Submit"
        onClick={(e) => onPreviewDone(e)}
      >
        Post
      </Button>
    </div>
  );
};

export default PostCreateStep2;
