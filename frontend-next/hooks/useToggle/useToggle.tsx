import React from 'react';

export const useToggle = (): {state: boolean, handlers: {on: ()=>void, off: ()=>void, toggle: ()=>void}} => {
  const [state, setState] = React.useState<boolean>(false);

  const handlers = React.useMemo(
    () => ({
      on: () => {
        setState(true);
      },
      off: () => {
        setState(false);
      },
      toggle: () => {
        setState((s) => (s === true ? false : true));
      },
    }),
    [],
  );

  return {state, handlers};
};
