import {CSSProperties} from 'react';

export interface ButtonProps extends CSSProperties {
  color: 'blue' | 'red' | 'white';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}
