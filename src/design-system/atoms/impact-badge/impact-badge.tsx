import {CSSProperties} from 'react';
import css from './impact-badge.module.scss';
import {ImpactBadgeProps} from './impact-badge.types';

export const ImpactBadge = (props: ImpactBadgeProps): JSX.Element => {
  const styles: CSSProperties = {
    backgroundColor: props.color,
  };
  return (
    <div role="button" style={styles} className={css.container}>
      <img
        width={48}
        height={24}
        src="/asset/icons/impact-icon-test.svg"
        alt=""
      />
    </div>
  );
};
