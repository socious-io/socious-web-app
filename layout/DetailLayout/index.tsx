import {FC, PropsWithChildren} from 'react';
import styles from './index.module.scss';

const DetailLayout: FC<PropsWithChildren> = ({children}) => {
  return <div className={`${styles.container}`}>{children}</div>;
};

export default DetailLayout;
