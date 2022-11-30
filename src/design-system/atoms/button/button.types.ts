export type ButtonProps = {
  color: 'blue' | 'red' | 'white';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};
