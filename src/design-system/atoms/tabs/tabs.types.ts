export type TabsProps = {
  tabs: Tab[];
};

type Tab = {
  name: string;
  content: React.ReactElement;
  default?: boolean;
};
