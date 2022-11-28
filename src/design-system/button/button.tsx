import css from './button.module.scss';
import {ButtonProps} from './button.types';

export function Button(props: ButtonProps): JSX.Element {
  return <button className={css.button}>Button</button>;
}
