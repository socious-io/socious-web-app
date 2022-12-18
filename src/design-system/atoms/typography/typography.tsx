import css from './typography.module.scss';
import {CSSProperties} from 'react';
import {TypeList, TypographyProps} from './typography.types';

export const Typography = (props: TypographyProps): JSX.Element => {
  const {size = 'm', type = 'body'} = props;

  const sizeList: Record<string, CSSProperties> = {
    m: {fontSize: 'var(--font-size-m)'},
    l: {fontSize: 'var(--font-size-l)'},
  };

  const typeList: TypeList = {
    heading: {fontFamily: 'Hahmlet', fontWeight: 600},
    body: {fontFamily: 'Hahmlet, sans-serif'},
  };

  const styles = {...sizeList[size], ...typeList[type], ...props.style};

  return (
    <p style={styles} className={`${css.container} ${props?.className}`}>
      {props.children}
    </p>
  );
};
