import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42],
});

export const walletconnect = new WalletConnectConnector({
  rpcUrl: "https://mainnet.infura.io/v3/889b5884688e4db589d44dbd47a7f15b",
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
});
