import {CSSProperties} from 'react';

export type TypographyProps = {
  children: React.ReactNode;
  size?: 'm' | 'l';
  type?: 'heading' | 'body';
  style?: CSSProperties;
};

export type TypeList = Record<
  NonNullable<TypographyProps['type']>,
  CSSProperties
>;
