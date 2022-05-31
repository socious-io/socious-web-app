import { createContext, ReactNode, useContext, useMemo, useState } from "react";

import { useWallet, UseWallet } from "./useWallet";

const WalletContext = createContext<UseWallet>(null!);

type Props = {
  children: ReactNode;
};
function WalletProvider({ children }: Props) {
  const [walletAddress, setWalletAddress] = useWallet("");

  return (
    <WalletContext.Provider value={[walletAddress, setWalletAddress]}>
      {children}
    </WalletContext.Provider>
  );
}
function useWalletContext() {
  return useContext(WalletContext);
}

export { WalletProvider, useWalletContext };
