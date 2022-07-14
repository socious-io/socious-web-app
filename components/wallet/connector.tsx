import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

export const injected = new InjectedConnector();

export const connector = new WalletConnectConnector({ options: { qrcode: true } });
