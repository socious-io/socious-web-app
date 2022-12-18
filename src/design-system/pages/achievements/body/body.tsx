import css from './body.module.scss';
import {BodyProps} from './body.types';

export const Body = (props: BodyProps): JSX.Element => {
  return <div className={css.container}>body</div>;
};
