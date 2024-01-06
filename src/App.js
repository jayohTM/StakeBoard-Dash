import Dash from "./Dash"
import '@rainbow-me/rainbowkit/styles.css';
import { trustWallet, ledgerWallet, tahoWallet, omniWallet, zerionWallet } from '@rainbow-me/rainbowkit/wallets';
import {
  getDefaultWallets,
  RainbowKitProvider,
  connectorsForWallets,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig  } from 'wagmi';
import { mainnet, arbitrum, polygon, optimism } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query' 
import { WagmiProvider } from 'wagmi'
//import { config } from './config'

const queryClient = new QueryClient() 





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
  projectId: '5ad46a6cfa06d0dfd7595228ef802a91',
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
      <QueryClientProvider client={queryClient}> 
      <RainbowKitProvider appInfo={appInfo} chains={chains} theme={darkTheme({
        accentColor: '#FFFFFF',
        accentColorForeground: '#000000',
        overlayBlur: 'small',
        fontStack: 'rounded',
      })}>
        <Dash />
      </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiConfig>
  );
}

export default App;
