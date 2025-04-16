import { useEffect } from 'react';
import { useDisconnect, useAppKit, useAppKitNetwork, useAppKitAccount } from '@reown/appkit/react';
import { parseGwei } from 'viem';
import { useEstimateGas, useSendTransaction, useSignMessage, useBalance } from 'wagmi';
import { networks } from '../config';
import { Link } from 'react-router-dom';

// test transaction
const TEST_TX = {
    to: "0xe9daC0897Fa99BbE6998caE81457bcA0B2a3946b",
    value: parseGwei('0.0001')
};

export const ActionButtonList = ({ sendHash, sendSignMsg, sendBalance, msg }) => {
    const { disconnect } = useDisconnect();
    const { open } = useAppKit();
    const { switchNetwork } = useAppKitNetwork();
    const { address, isConnected } = useAppKitAccount();

    const { data: gas } = useEstimateGas({ ...TEST_TX });
    const { data: hash, sendTransaction } = useSendTransaction();
    const { signMessageAsync } = useSignMessage();
    const { refetch } = useBalance({
        address: address
    });

    useEffect(() => {
        if (hash) {
            sendHash(hash);
        }
    }, [hash]);

    const handleSendTx = () => {
        try {
            sendTransaction({
                ...TEST_TX,
                gas
            });
        } catch (err) {
            console.log('Error sending transaction:', err);
        }
    };

    const handleSignMsg = async () => {
        console.log(msg);
        const sig = await signMessageAsync({ message: msg, account: address });
        sendSignMsg(sig);
    };

    const handleGetBalance = async () => {
        const balance = await refetch();
        sendBalance(balance?.data?.value.toString() + " " + balance?.data?.symbol.toString());
    };

    const handleDisconnect = async () => {
        try {
            await disconnect();
        } catch (error) {
            console.error("Failed to disconnect:", error);
        }
    };

    return (
        isConnected && (
            <div>
                <button onClick={() => open()}>Open</button>
                <button onClick={handleDisconnect}>Disconnect</button>
                <button onClick={() => switchNetwork(networks[1])}>Switch</button>
                <button onClick={handleSignMsg}>Sign msg</button>
                <button onClick={handleSendTx}>Send tx</button>
                <button onClick={handleGetBalance}>Get Balance</button>
                <Link to="/component-authoried">Go to Client</Link>
            </div>
        )
    );
};
