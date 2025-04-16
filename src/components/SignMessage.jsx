import { useEffect } from 'react';
import { useDisconnect, useAppKitAccount } from '@reown/appkit/react';
import { useSignMessage } from 'wagmi';
import { store } from '../localstorageUtils';


export default function SignMessage({ sendSignMsg, msg, execute, setExecute }) {
    const { disconnect } = useDisconnect();
    const { address } = useAppKitAccount();

    const isAuth = store("AUTH").get()

    const { signMessageAsync, isSuccess, isPending, isError } = useSignMessage();
    useEffect(() => {
        const sign = async () => {
            if (!isSuccess && execute && !isAuth?.accessToken) {
                const sig = await signMessageAsync({ message: msg, account: address })
                sendSignMsg(sig)
            }
        }
        sign()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [execute, isSuccess])


    const handleDisconnect = async () => {
        try {
            store("AUTH").clear()
            setExecute(false)
            await disconnect();
        } catch (error) {
            console.error("Failed to disconnect:", error);
        }
    };
    useEffect(() => {
        if (isError)
            handleDisconnect()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isError])

    if (isPending)
        return (<div>Loading...</div>)
};
