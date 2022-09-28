import {Button} from '@components/common';
import ImageUploader from '@components/common/ImageUploader/ImageUploader';
import profile_img_icon from 'asset/images/user.png';
import {StepProps} from '@models/stepProps';
import {useState} from 'react';

const OnboardingStep9 = ({onSubmit}: StepProps) => {
  const [file, setFile] = useState<any>();
  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(file);
  };

  return (
    <form
      onSubmit={handleOnSubmit}
      className="flex grow flex-col justify-between px-10"
    >
      <div className="align-center flex grow justify-center">
        <div className="flex flex-col">
          {' '}
          <h1 className="font-helmet my-6 text-center">Add a profile photo</h1>
          <div className="flex flex-col items-center">
            <ImageUploader
              onChange={(file: any) => setFile(file)}
              src={profile_img_icon}
            >
              {(setOpen: any) => (
                <Button
                  className="m-auto mt-4  flex w-full max-w-xs items-center justify-center align-middle "
                  size="lg"
                  variant="outline"
                  onClick={setOpen}
                >
                  Add from album
                </Button>
              )}
            </ImageUploader>
          </div>
        </div>
      </div>

      <div className="-mx-16 divide-x  border-t-2 border-b-grayLineBased">
        <Button
          className="m-auto mt-4 mb-12 flex w-full max-w-xs items-center justify-center align-middle "
          type="submit"
          size="lg"
          variant="fill"
          value="Submit"
        >
          Complete your profile
        </Button>
      </div>
    </form>
  );
};

export default OnboardingStep9;
