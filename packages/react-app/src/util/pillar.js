// https://try.etherspot.dev/#SignMessage

import { Sdk, MetaMaskWalletProvider, EnvNames, NetworkNames } from "etherspot";

let sdk;

export async function initWallet() {
  if (!MetaMaskWalletProvider.detect()) {
    console.log("MetaMask not detected");
    return;
  }

  const walletProvider = await MetaMaskWalletProvider.connect();

  sdk = new Sdk(walletProvider, {
    env: EnvNames.TestNets,
    networkName: NetworkNames.Rinkeby,
  });

  await sdk.syncAccount();
  console.info("SDK created");
  return await sdk.getAccountBalances();
}
