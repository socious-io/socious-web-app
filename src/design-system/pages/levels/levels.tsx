import {TwoThird} from '../../../../src/design-system/templates/two-third/two-third';
import {Header} from './header/header';
import {LevelsProps} from './levels.types';

export const Levels = (props: LevelsProps): JSX.Element => {
  return <TwoThird top={<Header />} bottom={<p>body</p>} />;
};
