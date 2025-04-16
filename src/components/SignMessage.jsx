import { useEffect } from 'react';
import { useDisconnect, useAppKitAccount } from '@reown/appkit/react';
import { useSignMessage } from 'wagmi';
import { store } from '../localstorageUtils';


export default function SignMessage({ sendSignMsg, msg, execute }) {
    const { disconnect } = useDisconnect();
    const { address } = useAppKitAccount();

    const { signMessageAsync, isSuccess, isPending, isError } = useSignMessage();
    useEffect(() => {
        const sign = async () => {
            if (!isSuccess && execute) {
                const sig = await signMessageAsync({ message: msg, account: address })
                sendSignMsg(sig)
            }
        }
        sign()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [execute, isSuccess])


    const handleDisconnect = async () => {
        try {
            await disconnect();
        } catch (error) {
            console.error("Failed to disconnect:", error);
        }
    };

    if (isPending)
        return (<div>Loading...</div>)
    if (isError) {
        store("AUTH").clear()
        handleDisconnect()
        return (<div>isPaused</div>)
    }
};
