import { WagmiAdapter } from "@reown/appkit-adapter-wagmi"
import { arbitrum, mainnet, sepolia } from "viem/chains"

export const projectId = import.meta.env.VITE_PUBLIC_PROJECT_ID

if (!projectId) throw new Error('Project ID is not defined')

export const metadata = {
    name: 'AppKit',
    description: 'AppKit hello',
    url: import.meta.env.VITE_API_URL,
    icons: ['https://avatars.githubusercontent.com/u/179229932']
}

export const networks = [
    mainnet,
    arbitrum,
    sepolia,
]

export const wagmiAdapter = new WagmiAdapter({
    projectId,
    networks
})

export const config = wagmiAdapter.wagmiConfig
