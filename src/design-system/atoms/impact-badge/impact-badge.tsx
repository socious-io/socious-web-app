import {CSSProperties} from 'react';
import css from './impact-badge.module.scss';
import {ImpactBadgeProps} from './impact-badge.types';
import icon from '/asset/icons/impact-category-list/10 Reduce Inequalities.svg';

export const ImpactBadge = (props: ImpactBadgeProps): JSX.Element => {
  const styles: CSSProperties = {
    backgroundColor: props.color,
  };

  return (
    <div role="button" style={styles} className={css.container}>
      <img alt="impact icon" src={icon} />
    </div>
  );
};
