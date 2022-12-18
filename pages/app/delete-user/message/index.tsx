import css from './message.module.scss';
import {NextPage} from 'next';
import {useRouter} from 'next/router';
import {Typography} from 'src/design-system/atoms/typography/typography';
import {Button} from 'src/design-system/atoms/button/button';
import {useUser} from '@hooks';
import TypoCompany from 'asset/icons/typo-company.svg';

const Message: NextPage = () => {
  const router = useRouter();
  const {currentIdentity} = useUser();
  const email = currentIdentity?.meta?.email || '';

  return (
    <div className={css.container}>
      <img height={160} src={TypoCompany} alt="" />
      <Typography size="l" type="heading" className={css.heading}>
        Your account has been deleted.
      </Typography>
      <Typography type="body" className={css.body}>
        You will receive a confirmation email at: {email}
      </Typography>
      <Button
        className={css.btn}
        color="blue"
        onClick={() => router.push('/app/auth/signup')}
      >
        Join now
      </Button>
    </div>
  );
};

export default Message;
