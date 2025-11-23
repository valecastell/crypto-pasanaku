import { useState } from 'react';

// Interfaces TypeScript para window.ethereum
interface EthereumProvider {
    request: (args: { method: string; params?: any[] }) => Promise<any>;
    on: (event: string, callback: (...args: any[]) => void) => void;
    removeListener: (event: string, callback: (...args: any[]) => void) => void;
}

declare global {
    interface Window {
        ethereum?: EthereumProvider;
    }
}

// Tipo para el chainIdMap
type ChainIdMap = {
    [key: string]: string;
};

const WalletConnect = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [account, setAccount] = useState('');
    const [network, setNetwork] = useState('');
    const [balance, setBalance] = useState('');

    const connectWallet = async () => {
        // INTENTAR conexión real primero
        if (typeof window.ethereum !== 'undefined') {
            try {
                console.log('🦊 MetaMask detectado, intentando conexión real...');
                const accounts = await window.ethereum!.request({
                    method: 'eth_requestAccounts'
                });

                setIsConnected(true);
                setAccount(`${accounts[0].substring(0, 6)}...${accounts[0].substring(38)}`);

                // Detectar red real
                const chainId = await window.ethereum!.request({ method: 'eth_chainId' });
                const chainIdMap: ChainIdMap = {
                    '0xa4ec': 'Celo Mainnet',
                    '0x1': 'Ethereum',
                    '0x89': 'Polygon',
                    '0x13881': 'Polygon Mumbai',
                    '0x5': 'Goerli'
                };

                // Type-safe access to chainIdMap
                const networkName = chainIdMap[chainId as keyof ChainIdMap] || `Chain ${chainId}`;
                setNetwork(networkName);

                console.log('✅ Conexión REAL exitosa');

                // Configurar event listeners para cambios
                setupEventListeners();

            } catch (error) {
                console.log('❌ Usuario rechazó conexión, usando modo demo');
                mockConnect();
            }
        } else {
            console.log('📱 No hay wallet, usando modo demo');
            mockConnect();
        }
    };

    const setupEventListeners = () => {
        if (window.ethereum) {
            // Listener para cambio de red
            window.ethereum.on('chainChanged', (chainId: string) => {
                console.log('🔄 Red cambiada:', chainId);
                const chainIdMap: ChainIdMap = {
                    '0xa4ec': 'Celo Mainnet',
                    '0x1': 'Ethereum',
                    '0x89': 'Polygon'
                };
                const networkName = chainIdMap[chainId as keyof ChainIdMap] || `Chain ${chainId}`;
                setNetwork(networkName);
            });

            // Listener para cambio de cuenta
            window.ethereum.on('accountsChanged', (accounts: string[]) => {
                console.log('👤 Cuenta cambiada:', accounts);
                if (accounts.length === 0) {
                    // Usuario desconectó wallet
                    disconnect();
                } else {
                    setAccount(`${accounts[0].substring(0, 6)}...${accounts[0].substring(38)}`);
                }
            });
        }
    };

    const mockConnect = () => {
        setIsConnected(true);
        setAccount('0x742d...c3e5');
        setNetwork('Celo Mainnet');
        setBalance('4.2589 CELO');
    };

    const disconnect = () => {
        // Remover event listeners
        if (window.ethereum) {
            window.ethereum.removeListener('chainChanged', () => {});
            window.ethereum.removeListener('accountsChanged', () => {});
        }

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
                        onClick={disconnect}
                        className="text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded border border-red-500/30 hover:bg-red-500/30 transition-colors"
                    >
                        Disconnect
                    </button>
                </div>
            ) : (
                <button
                    onClick={connectWallet}
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