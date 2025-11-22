import React, { useState } from 'react';

interface WalletState {
    address: string | null;
    isConnected: boolean;
    chainId: number | null;
}

const WalletConnect: React.FC = () => {
    const [wallet, setWallet] = useState<WalletState>({
        address: null,
        isConnected: false,
        chainId: null
    });
    const [isConnecting, setIsConnecting] = useState(false);

    const connectWallet = async () => {
        setIsConnecting(true);
        await new Promise(resolve => setTimeout(resolve, 1000));

        setWallet({
            address: '0x742d35Aa6620E5A9B7E4C9A1B17E4C9A1B17E4C9',
            isConnected: true,
            chainId: 44787
        });

        setIsConnecting(false);
    };

    const disconnectWallet = () => {
        setWallet({
            address: null,
            isConnected: false,
            chainId: null
        });
    };

    const formatAddress = (address: string) => {
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    return (
        <div className="flex items-center gap-4">
            {!wallet.isConnected ? (
                <button
                    onClick={connectWallet}
                    disabled={isConnecting}
                    className="bg-gradient-to-r from-celo-green to-green-500 text-white px-6 py-2 rounded-xl font-semibold hover:from-green-600 hover:to-green-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    {isConnecting ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Connecting...
                        </>
                    ) : (
                        <>
                            <span>🔗</span>
                            Connect Wallet
                        </>
                    )}
                </button>
            ) : (
                <div className="flex items-center gap-3">
                    <div className="bg-celo-green/20 text-celo-green text-xs font-medium px-2 py-1 rounded-full border border-celo-green/30">
                        Celo Testnet
                    </div>
                    <div className="bg-white/10 text-white px-3 py-2 rounded-lg border border-white/20">
                        {formatAddress(wallet.address!)}
                    </div>
                    <button
                        onClick={disconnectWallet}
                        className="bg-white/10 text-white px-3 py-2 rounded-lg border border-white/20 hover:bg-white/20 transition-colors"
                    >
                        Disconnect
                    </button>
                </div>
            )}
        </div>
    );
};

export default WalletConnect;