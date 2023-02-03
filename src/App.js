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
      alchemyProvider({ apiKey: "S7MPoB_0i7JIiGeYXXbwS99K64J9YuLL" }),
      publicProvider()
    ]
  );
  const { connectors } = getDefaultWallets({
    appName: 'Stakeboard',
    chains
  });
  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
  })

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} initialChain={mainnet} theme={darkTheme({
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
