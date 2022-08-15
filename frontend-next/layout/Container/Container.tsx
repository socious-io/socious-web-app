import * as React from 'react';

export interface ContainerProps {
  children: React.ReactNode;
}

export function Container(props: ContainerProps) {
  return (
    <main className="container mx-auto max-w-5xl my-10 h-96">
      {props.children}
    </main>
  );
}

export default Container;
