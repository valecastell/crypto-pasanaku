import { useState } from 'react';

const WalletConnect = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [account, setAccount] = useState('');
    const [network, setNetwork] = useState('');
    const [balance, setBalance] = useState('');

    const mockConnect = async () => {
        // Simular proceso de conexión real
        setIsConnected(true);
        setAccount('0x742d...c3e5');
        setNetwork('Celo Mainnet');
        setBalance('4.2589 CELO');

        // Simular detección de red correcta
        console.log('✅ Wallet connected to Celo Mainnet');
    };

    const mockDisconnect = () => {
        setIsConnected(false);
        setAccount('');
        setNetwork('');
        setBalance('');
    };

    return (
        <div className="flex items-center gap-4">
            {isConnected ? (
                <div className="flex items-center gap-4">
                    {/* Network Indicator */}
                    <div className="hidden sm:flex items-center gap-2 bg-green-500/20 text-green-300 text-sm px-3 py-1 rounded-full border border-green-400/30">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        {network}
                    </div>

                    {/* Balance */}
                    <div className="hidden md:flex items-center gap-2 bg-white/10 text-white text-sm px-3 py-1 rounded-full border border-white/20">
                        <span>💰</span>
                        {balance}
                    </div>

                    {/* Account */}
                    <div className="flex items-center gap-2 bg-white/10 text-white text-sm px-3 py-1 rounded-full border border-white/20">
                        <span>👤</span>
                        {account}
                    </div>

                    {/* Disconnect */}
                    <button
                        onClick={mockDisconnect}
                        className="text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded border border-red-500/30 hover:bg-red-500/30 transition-colors"
                    >
                        Disconnect
                    </button>
                </div>
            ) : (
                <button
                    onClick={mockConnect}
                    className="btn-primary flex items-center gap-2"
                >
                    <span>🔗</span>
                    Connect Wallet
                </button>
            )}
        </div>
    );
};

export default WalletConnect;