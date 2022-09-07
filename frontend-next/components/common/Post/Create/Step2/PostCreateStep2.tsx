import { StepProps } from '@models/stepProps';
import React, { ReactElement, useCallback, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import Modal from "components/common/Modal/Modal";
import Chip from '@components/common/Chip/Chip';
import Avatar from '@components/common/Avatar/Avatar';
import Button from '@components/common/Button/Button';
import Image from "next/image";
import useUser from 'hooks/useUser/useUser';

interface PostCreateStep2Props extends StepProps {
  file: any | null;
}

const PostCreateStep2 = ({onSubmit, file}: PostCreateStep2Props) => {
  const {handleSubmit, getValues} = useFormContext();
  const social_causes = getValues("causes_tags");
  const content = getValues("content");
  const [url, setUrl] = React.useState<any>("");

  const { user } = useUser();

  useEffect(() => {
    const reader = new FileReader();
    if (file) {
      reader.onloadend = () => {
        setUrl(reader?.result || '');
      };
      reader.readAsDataURL(file);
    }
  }, [file])

  const onPreviewDone = useCallback((e:  React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    onSubmit(true);
  }, [onSubmit])

  return (
    <div>
      <Modal.Title>
        <h2 className="text-center mb-4">Review post</h2>
      </Modal.Title>
      <Modal.Description>
        <div className='-mr-6 -ml-6 p-4 border-y-[.5px]'>
          <div className='space-x-3 flex items-center'>
            <Avatar src={user?.avatar}/>
            <span>
              {user?.username ?? "User Name"}
            </span>
          </div>
          <Chip
            containerClassName='bg-secondarySLight inline-block mt-4 mb-6'
            contentClassName='text-secondary font-normal text-sm'
            // content={"apple"}
            content={social_causes ?? "ENVIRONMENT"}
          />
          <p className='min-h-[8rem]'>{content || " ipsum dolor sit amet, consectetur adipiscing elit. Nibh aliquet nullam odio maecenas semper. Dui felis suspendisse nunc, in vel enim nunc adipiscing donec. Pellentesque a magna venenatis ut ut semper dictum sit sem. Suspendisse lacus, pulvinar elit ipsum fermentum. Ipsum, orci, faucibus nibh et commodo et, dignissim erat. Adipiscing fusce et fames aliquam condimentum. "}</p>
          {url &&
            <div className="mx-auto rounded-xl h-48 w-80">
              <Image
                src={url}
                width="100%"
                height="100%"
                className='object-cover'
                alt="Image"
              />
            </div>
          }
        </div>
      </Modal.Description>
      <Button
        className="max-w-xs ml-auto flex items-center justify-center align-middle mt-4 "
        type="submit"
        // size="lg"
        variant="fill"
        value="Submit"
        onClick={e => onPreviewDone(e)}
        >
        Create Post
      </Button>
    </div>
  );
};

export default PostCreateStep2;