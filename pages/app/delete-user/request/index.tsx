import css from './request.module.scss';
import {NextPage} from 'next';
import {Article} from 'src/design-system/molecules/article/article';
import {Header} from 'src/design-system/atoms/header/header';
import {Button} from 'src/design-system/atoms/button/button';
import {useRouter} from 'next/router';

const title = 'Are you sure?';
const body =
  'Deleting your account will erase all your existing activity on Socious, including connections you`ve made, and projects you`ve contributed to. This action is irreversible.';

const Request: NextPage = () => {
  const router = useRouter();

  function onContinue() {
    router.push('./confirm');
  }

  function onCancel() {
    router.push('/app/projects');
  }

  return (
    <div className={css.container}>
      <Header onBackBtnClick={router.back} />
      <Article className={css.article} title={title} body={body} />
      <div className={css.actions}>
        <Button onClick={onContinue} className={css.continueBtn} color="blue">
          Continue
        </Button>
        <Button color="white" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default Request;
