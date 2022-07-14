import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

export const connector = new WalletConnectConnector({ options: { qrcode: true } });
