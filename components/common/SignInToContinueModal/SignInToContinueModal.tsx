import Link from 'next/link';
import {useRouter} from 'next/router';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';

type SignInToContinueModalProps = {
  isOpen: boolean;
  onClose(): void;
};

const SignInToContinueModal = (props: SignInToContinueModalProps) => {
  const {isOpen, onClose} = props;

  const router = useRouter();
  const pathname = router.asPath + '?apply=new';

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Title>Sign in to Socious</Modal.Title>
      <Modal.Description>
        <div className="mt-1">
          <p className="text-sm text-gray-500">
            To continue, please sign in or register
          </p>
        </div>
      </Modal.Description>

      <div className="mt-8">
        <Link passHref href={`/app/auth/signup?redirect_to=${pathname}`}>
          <Button
            className="m-auto mt-4 flex w-full max-w-xs items-center justify-center align-middle "
            type="submit"
            size="lg"
            variant="fill"
            value="Submit"
            autoFocus={false}
          >
            Join now
          </Button>
        </Link>
      </div>

      <div className="my-4">
        <Link passHref href={`/app/auth/login?redirect_to=${pathname}`}>
          <Button
            className="m-auto mt-4 flex w-full max-w-xs items-center justify-center align-middle "
            type="submit"
            size="lg"
            variant="outline"
            value="Submit"
            autoFocus={false}
          >
            Sign in
          </Button>
        </Link>
      </div>
    </Modal>
  );
};

export default SignInToContinueModal;
