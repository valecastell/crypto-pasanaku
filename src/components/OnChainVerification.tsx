import React from 'react';

interface Group {
    contractAddress: string;
    createdBlock: number;
    totalDistributed: string;
    onChainVerified: boolean;
    transactionHash?: string;
    creator: string;
}

interface OnChainVerificationProps {
    group: Group;
}

const OnChainVerification: React.FC<OnChainVerificationProps> = ({ group }) => {
    const formatAddress = (address: string) => {
        return `${address.substring(0, 8)}...${address.substring(address.length - 6)}`;
    };

    const openInExplorer = (type: 'tx' | 'address', hash: string) => {
        const baseUrl = 'https://explorer.celo.org';
        const url = type === 'tx'
            ? `${baseUrl}/tx/${hash}`
            : `${baseUrl}/address/${hash}`;

        console.log(`Opening: ${url}`);
        window.open(url, '_blank');
    };

    return (
        <div className="card mt-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <span className="text-green-400">🔗</span>
                On-Chain Verification
            </h3>

            <div className="space-y-4">
                {/* Contract Address */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="glass-text-light text-sm">Contract Address:</span>
                    <div className="flex items-center gap-2">
                        <span className="text-white font-mono text-sm bg-white/10 px-3 py-1 rounded border border-white/20">
                            {formatAddress(group.contractAddress)}
                        </span>
                        <button
                            onClick={() => openInExplorer('address', group.contractAddress)}
                            className="text-blue-400 hover:text-blue-300 transition-colors"
                            title="View on Celo Explorer"
                        >
                            🔍
                        </button>
                    </div>
                </div>

                {/* Created Block */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="glass-text-light text-sm">Created Block:</span>
                    <span className="text-white font-semibold bg-blue-500/20 px-3 py-1 rounded border border-blue-400/30">
                        #{group.createdBlock.toLocaleString()}
                    </span>
                </div>

                {/* Creator */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="glass-text-light text-sm">Creator:</span>
                    <span className="text-white font-mono text-sm">
                        {formatAddress(group.creator)}
                    </span>
                </div>

                {/* Total Distributed */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="glass-text-light text-sm">Total Distributed:</span>
                    <span className="text-green-400 font-semibold text-lg">
                        {group.totalDistributed}
                    </span>
                </div>

                {/* Verification Status */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="glass-text-light text-sm">Verification Status:</span>
                    <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${
                            group.onChainVerified ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'
                        }`}></div>
                        <span className={`font-semibold ${
                            group.onChainVerified ? 'text-green-400' : 'text-yellow-400'
                        }`}>
                            {group.onChainVerified ? '✅ Verified On-Chain' : '⏳ Pending Verification'}
                        </span>
                    </div>
                </div>

                {/* Transaction Hash (si existe) */}
                {group.transactionHash && (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <span className="glass-text-light text-sm">Last Transaction:</span>
                        <div className="flex items-center gap-2">
                            <span className="text-white font-mono text-xs bg-white/10 px-2 py-1 rounded">
                                {formatAddress(group.transactionHash)}
                            </span>
                            <button
                                onClick={() => openInExplorer('tx', group.transactionHash!)}
                                className="text-blue-400 hover:text-blue-300 transition-colors text-sm"
                            >
                                View
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
                <button
                    onClick={() => openInExplorer('address', group.contractAddress)}
                    className="flex-1 bg-blue-500/20 text-blue-300 py-2 rounded-lg border border-blue-400/30 hover:bg-blue-500/30 transition-colors flex items-center justify-center gap-2"
                >
                    <span>🔍</span>
                    View Contract
                </button>
                <button
                    onClick={() => openInExplorer('tx', group.transactionHash || group.contractAddress)}
                    className="flex-1 bg-green-500/20 text-green-300 py-2 rounded-lg border border-green-400/30 hover:bg-green-500/30 transition-colors flex items-center justify-center gap-2"
                >
                    <span>📄</span>
                    View Transactions
                </button>
            </div>

            {/* Network Info */}
            <div className="mt-4 p-3 bg-white/10 rounded-lg border border-white/20">
                <div className="flex items-center justify-between text-sm">
                    <span className="glass-text-light">Network:</span>
                    <span className="text-green-400 font-semibold">Celo Mainnet</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-1">
                    <span className="glass-text-light">Explorer:</span>
                    <span className="text-white">explorer.celo.org</span>
                </div>
            </div>
        </div>
    );
};

export default OnChainVerification;