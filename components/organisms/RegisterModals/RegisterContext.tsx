import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from 'react';

export type TRegisterContext = {
  state: 'SIGNUP' | 'LOGIN' | null;
  step: number;
};

const initContext: TRegisterContext = {
  state: null,
  step: 1,
};

const RegisterContext = createContext<{
  registerContext: TRegisterContext;
  setRegisterContext: Dispatch<SetStateAction<TRegisterContext>>;
}>({
  registerContext: initContext,
  setRegisterContext: (a: any) => null,
});

export const RegisterContextProvider: FC<PropsWithChildren> = ({children}) => {
  const [registerContext, setRegisterContext] =
    useState<TRegisterContext>(initContext);

  const RegisterContextValue: {
    registerContext: TRegisterContext;
    setRegisterContext: Dispatch<SetStateAction<TRegisterContext>>;
  } = {
    registerContext: registerContext,
    setRegisterContext: setRegisterContext,
  };

  return (
    <RegisterContext.Provider value={RegisterContextValue}>
      {children}
    </RegisterContext.Provider>
  );
};

export const useRegisterContext = () => {
  return useContext(RegisterContext);
};
