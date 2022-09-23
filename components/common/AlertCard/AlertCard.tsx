import {twMerge} from 'tailwind-merge';
import {Modal, Button} from '@components/common';

interface Props {
  title: string;
  description: string;
  titleColor: string;
  buttonTitleAccept: string;
  buttonTitleCancel: string;
  isOpen: boolean;
  close: () => void;
  accept?: () => void;
}

function AlertCard({
  title,
  titleColor,
  description,
  buttonTitleCancel,
  buttonTitleAccept,
  accept,
  close,
  isOpen,
}: Props) {
  return (
    <div className="items-content justify-content flex   flex-col px-2">
      <div>
        <Modal.Title>
          <h2 className={twMerge(' text-center', titleColor)}>{title}</h2>
        </Modal.Title>
        <Modal.Description>
          <div className="mt-8">
            <p>{description}</p>
          </div>
        </Modal.Description>
        <div className="mt-7 flex flex-col items-center ">
          <Button
            className="flex w-full  items-center justify-center align-middle text-white  "
            size="lg"
            variant="fill"
            type="button"
            onClick={accept}
          >
            {buttonTitleAccept}
          </Button>
          {buttonTitleCancel && (
            <Button
              className="mt-4 flex  w-full  items-center justify-center align-middle "
              type="button"
              size="lg"
              variant="outline"
              value="Submit"
              onClick={close}
            >
              {buttonTitleCancel}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AlertCard;
