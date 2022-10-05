import React from 'react';

interface Props {
  title: string;
  footer: string;
  children: JSX.Element | JSX.Element[];
  className?: string;
  onClickFooter?: () => void;
}

const RightPaneContainer: React.FC<Props> = ({
  title,
  footer,
  children,
  className = '',
  onClickFooter = () => {},
}) => {
  const rootStyle = [
    'border-1 max-h-min rounded-xl border border-grayLineBased bg-white',
    className,
  ].join(' ');

  return (
    <div className={rootStyle}>
      <p className="p-4 text-xl font-semibold">{title}</p>
      <hr className="border-grayLineBased" />
      {children}
      <p className="cursor-pointer p-4 text-primary" onClick={onClickFooter}>
        {footer}
      </p>
    </div>
  );
};

export default RightPaneContainer;
