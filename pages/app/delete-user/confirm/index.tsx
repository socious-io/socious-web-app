import css from './confirm.module.scss';
import {NextPage} from 'next';
import {Article} from 'src/design-system/molecules/article/article';
import {Header} from 'src/design-system/atoms/header/header';
import {Button} from 'src/design-system/atoms/button/button';
import {InputFiled} from '@components/common';
import {deleteUser, login} from '@api/auth/actions';
import {useUser} from '@hooks';
import {useState} from 'react';
import {LoginResp} from './confirm.types';
import {useRouter} from 'next/router';

const title = 'Delete account';
const body = 'Please enter your password to delete your account.';

const Confirm: NextPage = () => {
  const {currentIdentity} = useUser();
  const router = useRouter();
  const [password, setPassword] = useState('');

  function onSuccessSubmit(resp: LoginResp) {
    if (resp.message === 'success') {
      deleteUser()
        .then(() => {
          router.push('./message');
        })
        .catch(console.log);
    }
  }

  function onCancel() {
    router.push('/app/projects');
  }

  function onDeleteAccount() {
    console.log('currentIdentity', currentIdentity);
    const email = currentIdentity?.meta?.email || '';
    login(email, password).then(onSuccessSubmit).catch(console.log);
  }

  return (
    <div className={css.container}>
      <Header onBackBtnClick={router.back} />
      <Article className={css.article} title={title} body={body} />

      <div className={css.passwordInput}>
        <InputFiled
          onChange={(e) => setPassword(e.target.value)}
          required
          label="Enter password"
          type="password"
        />
      </div>

      <div className={css.actions}>
        <Button
          onClick={onDeleteAccount}
          className={css.continueBtn}
          color="red"
        >
          Delete my account
        </Button>
        <Button onClick={onCancel} color="white">
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default Confirm;
