import { useEffect, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { wagmiAdapter } from '../config'
import { useAppKit, useAppKitAccount, useAppKitNetwork, useDisconnect } from '@reown/appkit/react'
import { useNavigate } from 'react-router-dom'
import { store } from '../localstorageUtils'
import SignMessage from '../components/SignMessage'


const queryClient = new QueryClient()

export default function HomeComponent() {
    const navigate = useNavigate();
    const { address, isConnected } = useAppKitAccount()
    const { chainId } = useAppKitNetwork()
    const { open } = useAppKit();

    const [signedMsg, setSignedMsg] = useState('')
    const [msg, setMsg] = useState('')
    const [nonce, setNonce] = useState()
    const [isExecuteSignMsg, setIsExecuteSignMsg] = useState(false)

    const receiveSignedMsg = (msg) => setSignedMsg(msg)
    const { disconnect } = useDisconnect();
    const handleDisconnect = async () => {
        try {
            store("AUTH").clear()
            await disconnect();
        } catch (error) {
            console.error("Failed to disconnect:", error);
        }
    };

    useEffect(() => {
        let isMounted = true
        const fetchSignMessage = async () => {
            try {
                const response = await fetch('https://auth-api.luban.dev/api/v1/auth/sign-message')
                const json = await response.json()
                if (isMounted) {
                    setNonce(json.data?.nonce)
                    setMsg(json.data?.message)
                    setIsExecuteSignMsg(true)
                }
            } catch (error) {
                if (isConnected) setIsExecuteSignMsg(false)
                console.error('Error fetching sign message:', error)
            }
        }
        if (isConnected) fetchSignMessage()
        return () => { isMounted = false; }
    }, [isConnected])


    useEffect(() => {
        let isMounted = true
        const postSignedData = async () => {
            try {
                const response = await fetch('https://auth-api.luban.dev/api/v1/auth/sign-in/wallet', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        signature: signedMsg,
                        nonce: nonce,
                        publicAddress: address,
                        chainId: chainId,
                    }),
                })
                if (!response.ok) throw new Error('An error occurred while sending the data.')

                const result = await response.json()
                if (isMounted) {
                    store("AUTH").set(result.data)
                    setSignedMsg("")
                    setIsExecuteSignMsg(false)
                }
                navigate('/component-authoried')
            } catch (error) {
                handleDisconnect();
                setIsExecuteSignMsg(false)
                console.error('Error sending signed data:', error)
            }
        }
        if (signedMsg && nonce && address && chainId) postSignedData()
        return () => { isMounted = false }
    }, [address, chainId, navigate, nonce, signedMsg])
    return (
        <div className="pages">
            <h1>AppKit Wagmi React dApp Example</h1>

            <WagmiProvider config={wagmiAdapter.wagmiConfig}>
                <QueryClientProvider client={queryClient}>
                    {
                        isConnected ?
                            <SignMessage
                                sendSignMsg={receiveSignedMsg}
                                msg={msg}
                                execute={isExecuteSignMsg}
                                setExecute={(value) => setIsExecuteSignMsg(value)}
                            />
                            :
                            <button onClick={() => open({ view: "Connect", namespace: "eip155" })}>Connect Wallet</button>

                    }
                </QueryClientProvider>
            </WagmiProvider>
        </div>
    )
}
