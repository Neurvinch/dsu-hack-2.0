import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {PrivyProvider} from "@privy-io/react-auth"
import {polygonZkEvmTestnet, arbitrum,arbitrumSepolia} from "viem/chains"
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PrivyProvider
       appId='cmfghtgp40028jy0cwtuhwaq2'
       clientId='client-WY6QhTzTzEKzCAzBLW6pu5M4qwxqpKj6EHGJvJ6zEwcyz'
       config={{
        embeddedWallets: {
          ethereum: {
            createOnLogin: "users-without-wallets"
          },
          defaultChain: polygonZkEvmTestnet,
          supportedChains: [polygonZkEvmTestnet, arbitrum, arbitrumSepolia]
          
          
        }
       }}
    >
      <App />
    </PrivyProvider>
    
  </StrictMode>,
)
