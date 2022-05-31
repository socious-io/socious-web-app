import { useState, useEffect } from "react";

export type UseWallet = [
  string | null | undefined,
  React.Dispatch<React.SetStateAction<string | null | undefined>>
];

export const useWallet = (newValue: string): UseWallet => {
  const [walletAddress, setWalletAddress] = useState<string | null | undefined>(
    ""
  );

  useEffect(() => {
    setWalletAddress(newValue);
  }, [newValue]);

  return [walletAddress, setWalletAddress];
};
