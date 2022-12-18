import {CSSProperties} from 'react';
import css from './impact-bar-level.module.scss';
import {ImpactBarLevelProps} from './impact-bar-level.types';

export const ImpactBarLevel = (props: ImpactBarLevelProps): JSX.Element => {
  const {start, end, current} = props;

  const curr = current - start;
  const diff = end - start;
  const result = (curr / diff) * 100;

  const calculateTransformation = (value: number) => {
    const v = value - 100;

    if (v < -100) {
      return `calc(-100% + 0.75rem)`;
    }

    if (v > 0) {
      return `calc(0%)`;
    }

    if (v >= -50) {
      return `${v}%`;
    }

    if (v < -50) {
      return `calc(${v}% + 0.75rem)`;
    }
  };

  const style: CSSProperties = {
    transform: `translateX(${calculateTransformation(result)})`,
  };

  return (
    <div className={css.container}>
      <div className={css.currentLevel}>{props.prevLevel}</div>
      <div className={css.nextLevel}>{props.nextLevel}</div>
      <div className={css.prevLevel}>{props.currentLevel}</div>
      <div className={css.currentLevel}>{props.prevLevel}</div>
      <div className={css.startNumber}>{props.start}</div>
      <div className={css.endNumber}>{props.end}</div>
      <div className={css.barContainer} role="progressbar">
        <div style={style} className={css.innerBar}>
          <div className={css.bullet}></div>
        </div>
      </div>
    </div>
  );
};
