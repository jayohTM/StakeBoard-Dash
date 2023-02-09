import Dash from "./Dash"
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';


function App() {
  const { chains, provider } = configureChains(
    [mainnet, polygon, optimism, arbitrum],
    [
      alchemyProvider({ apiKey: "V-_LszxbA71AN08V7UfqeGC4BZGEn1Ir" }),
      publicProvider()
    ]
  );
  const { connectors } = getDefaultWallets({
    appName: 'StakeBoard',
    chains
  });
  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
  })

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={darkTheme({
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
