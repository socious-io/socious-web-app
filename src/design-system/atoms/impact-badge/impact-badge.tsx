import {LIST} from './impact-badge.constant';
import css from './impact-badge.module.scss';
import {ImpactBadgeProps} from './impact-badge.types';

export const ImpactBadge = ({name}: ImpactBadgeProps): JSX.Element => {
  console.log('name: ', name);

  const color = LIST[name].color;

  return (
    <div
      role="button"
      style={{backgroundColor: color}}
      className={css.container}
    >
      <img
        alt="impact icon"
        src={require(`/public/static/impact-category-list/${name}.svg`)}
      />
    </div>
  );
};
