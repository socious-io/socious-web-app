import {Button} from '@components/common';
import ImageUploader from '@components/common/ImageUploader/ImageUploader';
import profile_img_icon from 'asset/images/user.png';
import {StepProps} from '@models/stepProps';

const OnboardingStep9 = ({onSubmit}: StepProps) => {
  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    onSubmit('true');
  };

  return (
    <form
      onSubmit={handleOnSubmit}
      className="flex flex-col justify-between px-10 grow sm:grow-0"
    >
      <div className="flex flex-col h-[28rem]">
        {' '}
        <h1 className="font-helmet text-center my-6 ">Add a profile photo</h1>
        <div className="h-48 flex flex-col items-center">
          <ImageUploader onChange={(file: any) => {}} src={profile_img_icon}>
            {(setOpen: any) => (
              <Button
                className="max-w-xs w-full  m-auto flex items-center justify-center align-middle mt-4 "
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

      <div className="sm:h-48  border-t-2 border-b-grayLineBased divide-x -mx-16 ">
        <Button
          className="max-w-xs w-full  m-auto flex items-center justify-center align-middle mt-4 "
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
