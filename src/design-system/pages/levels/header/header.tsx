import css from './header.module.scss';
import {HeaderProps} from './header.types';

export const Header = (props: HeaderProps): JSX.Element => (
  <div className={css.container}>header</div>
);
