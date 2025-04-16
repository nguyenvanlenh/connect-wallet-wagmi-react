import { useAppKitAccount, useAppKitNetwork, useDisconnect } from '@reown/appkit/react';
import React from 'react'
import "@reown/appkit-wallet-button/react";
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { store } from '../../localstorageUtils';

export const Route = createFileRoute("/_protected/component-authoried")({
    component: ClientComponent,
});
function ClientComponent() {
    const { disconnect } = useDisconnect();

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
            navigate({ to: '/' })
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
