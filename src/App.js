import Dash from "./Dash"
import '@rainbow-me/rainbowkit/styles.css';
import { argentWallet, trustWallet, ledgerWallet, tahoWallet, omniWallet, zerionWallet } from '@rainbow-me/rainbowkit/wallets';
import {
  getDefaultWallets,
  RainbowKitProvider,
  connectorsForWallets,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet, arbitrum, polygon, optimism } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const projectId = '5ad46a6cfa06d0dfd7595228ef802a91';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, arbitrum, polygon, optimism],
  [
    alchemyProvider({ apiKey: "7NgQfM01vhHpxIHzQAUYx9XkIrWADPWg" }),
    publicProvider()
  ]
);

const { wallets } = getDefaultWallets({
  appName: 'StakeBoard',
  projectId,
  chains,
});

const appInfo = {
  name: 'StakeBoard',
};

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'More Wallets',
    wallets: [
      // argentWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
      omniWallet({ projectId, chains }),
      zerionWallet({ projectId, chains }),
      tahoWallet({ projectId, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient, 
  webSocketPublicClient,
})

function App() {

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider appInfo={appInfo} chains={chains} theme={darkTheme({
        accentColor: '#FFFFFF',
        accentColorForeground: '#000000',
        overlayBlur: 'small',
        fontStack: 'rounded',
      })}>
        <Dash />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
