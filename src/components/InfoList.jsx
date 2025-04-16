import {
    useAppKitState,
    useAppKitTheme,
    useAppKitAccount,
    useWalletInfo
} from '@reown/appkit/react';
import { useWaitForTransactionReceipt } from 'wagmi';

export const InfoList = ({ hash, signedMsg, balance }) => {
    const kitTheme = useAppKitTheme();
    const state = useAppKitState();
    const { address, caipAddress, isConnected, status, embeddedWalletInfo } = useAppKitAccount();
    // const events = useAppKitEvents();
    const { walletInfo } = useWalletInfo();

    const { data: receipt } = useWaitForTransactionReceipt({
        hash,
        confirmations: 2,
        timeout: 300000,
        pollingInterval: 1000,
    });

    // useEffect(() => {
    //     console.log("Events: ", events);
    // }, [events]);

    // useEffect(() => {
    //     console.log("Embedded Wallet Info: ", embeddedWalletInfo);
    // }, [embeddedWalletInfo]);

    return (
        <>
            {balance && (
                <section>
                    <h2>Balance: {balance}</h2>
                </section>
            )}
            {hash && (
                <section>
                    <h2>Sign Tx</h2>
                    <pre>
                        Hash: {hash}
                        <br />
                        Status: {receipt?.status?.toString()}
                        <br />
                    </pre>
                </section>
            )}
            {signedMsg && (
                <section>
                    <h2>Sign msg</h2>
                    <pre>
                        signedMsg: {signedMsg}
                        <br />
                    </pre>
                </section>
            )}
            <section>
                <h2>useAppKit</h2>
                <pre>
                    Address: {address}
                    <br />
                    caip Address: {caipAddress}
                    <br />
                    Connected: {isConnected?.toString()}
                    <br />
                    Status: {status}
                    <br />
                    Account Type: {embeddedWalletInfo?.accountType}
                    <br />
                    {embeddedWalletInfo?.user?.email && `Email: ${embeddedWalletInfo.user.email}\n`}
                    {embeddedWalletInfo?.user?.username && `Username: ${embeddedWalletInfo.user.username}\n`}
                    {embeddedWalletInfo?.authProvider && `Provider: ${embeddedWalletInfo.authProvider}\n`}
                </pre>
            </section>

            <section>
                <h2>Theme</h2>
                <pre>
                    Theme: {kitTheme.themeMode}
                    <br />
                </pre>
            </section>

            <section>
                <h2>State</h2>
                <pre>
                    activeChain: {state.activeChain}
                    <br />
                    loading: {state.loading?.toString()}
                    <br />
                    open: {state.open?.toString()}
                    <br />
                    selectedNetworkId: {state.selectedNetworkId?.toString()}
                    <br />
                </pre>
            </section>

            <section>
                <h2>WalletInfo</h2>
                <pre>
                    Name: {JSON.stringify(walletInfo)}
                    <br />
                </pre>
            </section>
        </>
    );
};
