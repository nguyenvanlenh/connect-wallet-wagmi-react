import { useAppKitAccount, useAppKitNetwork, useDisconnect } from '@reown/appkit/react';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { store } from '../localstorageUtils';
import "@reown/appkit-wallet-button/react";

export default function ClientComponent() {
    const { disconnect } = useDisconnect();
    const isAuth = store("AUTH").get()

    const { caipNetwork, caipNetworkId, chainId } = useAppKitNetwork()
    console.log({ caipNetwork, caipNetworkId, chainId });

    const { address, isConnected, caipAddress, status, embeddedWalletInfo } =
        useAppKitAccount();
    console.log({ address, isConnected, caipAddress, status, embeddedWalletInfo });


    // const { open } = useAppKit();
    const navigate = useNavigate()
    const handleDisconnect = async () => {
        try {
            await disconnect();
            store("AUTH").clear()
            navigate('/')
        } catch (error) {
            console.error("Failed to disconnect:", error);
        }
    };
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px"
        }}>
            <appkit-button />
            <appkit-network-button />
            <appkit-wallet-button wallet='metamask' />
            <button onClick={handleDisconnect}>Disconnect</button>
            {/* <button onClick={() => open({ view: "Connect", namespace: "eip155" })}>Open</button> */}
        </div>
    )
}
