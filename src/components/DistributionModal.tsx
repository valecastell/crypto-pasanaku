import React, { useState } from 'react';

interface DistributionModalProps {
    isOpen: boolean;
    onClose: () => void;
    groupId: string;
    poolAmount: string;
    recipient: string;
}

const DistributionModal: React.FC<DistributionModalProps> = ({
                                                                 isOpen,
                                                                 onClose,
                                                                 groupId,
                                                                 poolAmount,
                                                                 recipient
                                                             }) => {
    const [step, setStep] = useState<'confirm' | 'processing' | 'success'>('confirm');

    const handleDistribute = () => {
        setStep('processing');
        // Simular procesamiento
        setTimeout(() => {
            setStep('success');
        }, 2000);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="card max-w-md w-full">
                <h2 className="text-xl font-semibold text-white mb-6">Distribute Pool</h2>

                {/* Distribution Details */}
                <div className="bg-white/10 rounded-xl p-4 mb-6">
                    <div className="text-sm glass-text-light mb-2">Group: <span className="text-white font-semibold">{groupId}</span></div>
                    <div className="text-sm glass-text-light mb-2">Total Pool: <span className="text-white font-semibold">{poolAmount} USDC</span></div>
                    <div className="text-sm glass-text-light mb-2">Recipient: <span className="text-white font-semibold">{recipient}</span></div>
                    <div className="text-sm glass-text-light">Gas Fee: <span className="text-white font-semibold">~0.003 CELO</span></div>
                </div>

                {/* Confirm Distribution */}
                {step === 'confirm' && (
                    <div className="text-center">
                        <div className="text-4xl mb-4">💰</div>
                        <p className="glass-text-light mb-6">
                            Select the winner for this round? The pool of {poolAmount} USDC will be randomly distributed.
                        </p>
                        <button onClick={handleDistribute} className="btn-primary w-full mb-3">
                            Confirm Distribution
                        </button>
                        <button onClick={onClose} className="action-btn w-full">
                            Cancel
                        </button>
                    </div>
                )}

                {/* Processing */}
                {step === 'processing' && (
                    <div className="text-center">
                        <div className="text-4xl mb-4 animate-pulse">⏳</div>
                        <p className="glass-text-light mb-2">Distributing pool...</p>
                        <p className="text-sm glass-text-light">Transaction in progress</p>
                    </div>
                )}

                {/* Success */}
                {step === 'success' && (
                    <div className="text-center">
                        <div className="text-4xl mb-4">🎉</div>
                        <p className="text-white font-semibold mb-2">Distribution Successful!</p>
                        <p className="glass-text-light mb-4">
                            🎉 <span className="text-white font-semibold">{recipient}</span> won the pasanaku and received {poolAmount} USDC!
                        </p>
                        <div className="bg-green-500/20 border border-green-400/30 rounded-xl p-3 mb-4">
                            <p className="text-sm text-green-300">📬 Notification sent to all participants via XMTP</p>
                        </div>
                        <button onClick={onClose} className="btn-primary w-full">
                            Done
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DistributionModal;