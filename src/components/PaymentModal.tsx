import React, { useState } from 'react';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    groupId: string;
    amount: string;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, groupId, amount }) => {
    const [step, setStep] = useState<'approve' | 'confirm' | 'processing' | 'success'>('approve');

    const handleApprove = () => {
        setStep('confirm');
    };

    const handleConfirm = () => {
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
                <h2 className="text-xl font-semibold text-white mb-6">Pay Contribution Fee</h2>

                {/* Group Info */}
                <div className="bg-white/10 rounded-xl p-4 mb-6">
                    <div className="text-sm glass-text-light mb-2">Group: <span className="text-white font-semibold">{groupId}</span></div>
                    <div className="text-sm glass-text-light mb-2">Amount: <span className="text-white font-semibold">{amount} USDC</span></div>
                    <div className="text-sm glass-text-light">Gas Fee: <span className="text-white font-semibold">~0.001 CELO</span></div>
                </div>

                {/* Step 1: Approve USDC */}
                {step === 'approve' && (
                    <div className="text-center">
                        <div className="text-4xl mb-4">🔐</div>
                        <p className="glass-text-light mb-6">First, you need to approve USDC spending for the smart contract</p>
                        <button onClick={handleApprove} className="btn-primary w-full">
                            Approve USDC Spending
                        </button>
                    </div>
                )}

                {/* Step 2: Confirm Payment */}
                {step === 'confirm' && (
                    <div className="text-center">
                        <div className="text-4xl mb-4">💳</div>
                        <p className="glass-text-light mb-6">Confirm your payment of {amount} USDC</p>
                        <button onClick={handleConfirm} className="btn-primary w-full mb-3">
                            Confirm Payment
                        </button>
                        <button onClick={() => setStep('approve')} className="action-btn w-full">
                            Back
                        </button>
                    </div>
                )}

                {/* Step 3: Processing */}
                {step === 'processing' && (
                    <div className="text-center">
                        <div className="text-4xl mb-4 animate-pulse">⏳</div>
                        <p className="glass-text-light mb-2">Processing transaction...</p>
                        <p className="text-sm glass-text-light">Waiting for blockchain confirmation</p>
                    </div>
                )}

                {/* Step 4: Success */}
                {step === 'success' && (
                    <div className="text-center">
                        <div className="text-4xl mb-4">✅</div>
                        <p className="text-white font-semibold mb-2">Payment Successful!</p>
                        <p className="glass-text-light mb-4">Your contribution of {amount} USDC has been confirmed</p>
                        <div className="bg-green-500/20 border border-green-400/30 rounded-xl p-3 mb-4">
                            <p className="text-sm text-green-300">📬 Notification sent via XMTP</p>
                        </div>
                        <button onClick={onClose} className="btn-primary w-full">
                            Done
                        </button>
                    </div>
                )}

                {/* Close button for all steps except processing */}
                {step !== 'processing' && (
                    <button
                        onClick={onClose}
                        className="action-btn w-full mt-4"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </div>
    );
};

export default PaymentModal;