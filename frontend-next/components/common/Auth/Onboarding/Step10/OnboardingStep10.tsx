import { Button } from "@components/common";
import { BellIcon } from "@heroicons/react/outline";
import { StepProps } from "@models/stepProps";
const OnboardingStep10 = ({ onSubmit }: StepProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col justify-between  px-10     "
    >
      <div className="flex flex-col h-[28rem]">
        {" "}
        <BellIcon className="w-16 h-16 mx-auto fill-white border-2 border-white rounded-full bg-background " />
        <div className="flex flex-col justify-between      ">
          {" "}
          <h1 className="text-white mx-auto">Allow notifications</h1>
          <p className="text-base text-grayDisableButton mx-auto py-5">
            Stay up to date with messages, recommendations and posts
          </p>
        </div>
      </div>

      <div className="h-48 flex flex-col  border-t-2 border-b-grayLineBased divide-x  items-center ">
        <Button
          className="max-w-xs w-full   flex items-center justify-center align-middle mt-4 "
          type="submit"
          size="lg"
          variant="outline"
          value="Submit"
        >
          Allow notifications
        </Button>
        <Button
          className="max-w-xs w-full   flex items-center justify-center align-middle text-white  "
          size="lg"
          variant="link"
        >
          I’ll do it later
        </Button>
      </div>
    </form>
  );
};

export default OnboardingStep10;
