import * as React from 'react';

export interface ContainerProps {
  children: React.ReactNode;
}

export function Container(props: ContainerProps) {
  return (
    <main className="container mx-auto mb-10 h-96 max-w-5xl md:my-10">
      {props.children}
    </main>
  );
}

export default Container;
