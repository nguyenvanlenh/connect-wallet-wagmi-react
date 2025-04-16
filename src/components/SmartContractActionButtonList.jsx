import { useEffect } from 'react';
import { useAppKitNetwork, useAppKitAccount } from '@reown/appkit/react';
import { useReadContract, useWriteContract } from 'wagmi';

const storageABI = [
    {
        inputs: [],
        name: 'retrieve',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'num',
                type: 'uint256',
            },
        ],
        name: 'store',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
];

const storageSC = '0xEe6D291CC60d7CeD6627fA4cd8506912245c8cA4';

export const SmartContractActionButtonList = () => {
    const { isConnected } = useAppKitAccount();
    const { chainId } = useAppKitNetwork();

    const { writeContract, isSuccess } = useWriteContract();

    const readContract = useReadContract({
        address: storageSC,
        abi: storageABI,
        functionName: 'retrieve',
        query: {
            enabled: false, // disable the query on load
        },
    });

    useEffect(() => {
        if (isSuccess) {
            console.log('contract write success');
        }
    }, [isSuccess]);

    const handleReadSmartContract = async () => {
        console.log('Read Sepolia Smart Contract');
        const { data } = await readContract.refetch();
        console.log('data: ', data);
    };

    const handleWriteSmartContract = () => {
        console.log('Write Sepolia Smart Contract');
        writeContract({
            address: storageSC,
            abi: storageABI,
            functionName: 'store',
            args: [123n], // JavaScript vẫn hỗ trợ BigInt literal (123n)
        });
    };

    return (
        isConnected &&
        chainId === 11155111 && (
            <div>
                <button onClick={handleReadSmartContract}>
                    Read Sepolia Smart Contract
                </button>
                <button onClick={handleWriteSmartContract}>
                    Write Sepolia Smart Contract
                </button>
            </div>
        )
    );
};
