import {CSSProperties} from 'react';

export type TypographyProps = {
  children: React.ReactNode;
  size?: 'm' | 'l' | 's';
  type?: 'heading' | 'body';
  style?: CSSProperties;
  className?: string;
};

export type TypeList = Record<
  NonNullable<TypographyProps['type']>,
  CSSProperties
>;
