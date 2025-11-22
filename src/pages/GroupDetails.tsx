import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import PaymentModal from '../components/PaymentModal';
import DistributionModal from '../components/DistributionModal';
import SetAlertModal from '../components/SetAlertModal';

// Interface para participantes
interface Participant {
    address: string;
    paid: boolean;
    isYou: boolean;
    isAvailable?: boolean;
}

const GroupDetails: React.FC = () => {
    const { groupId } = useParams();
    const navigate = useNavigate();
    const { groups } = useApp();
    const [paymentModal, setPaymentModal] = useState({ open: false, groupId: '', amount: '' });
    const [distributionModal, setDistributionModal] = useState({ open: false, groupId: '', poolAmount: '', recipient: '' });
    const [alertModal, setAlertModal] = useState({ open: false, groupId: '', amount: '' });

    // Encontrar el grupo por ID
    const group = groups.find(g => g.id === parseInt(groupId || '0'));

    if (!group) {
        return (
            <div className="min-h-screen p-6 font-sans max-w-4xl mx-auto">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-white mb-4">Group Not Found</h1>
                    <button
                        onClick={() => navigate('/')}
                        className="btn-primary"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    // Datos simulados de participantes CON INTERFACE CORRECTA
    const participants: Participant[] = [
        { address: '0x1a2b...c3d4', paid: true, isYou: true },
        { address: '0x3e4f...g5h6', paid: true, isYou: false },
        { address: '0x7i8j...k9l0', paid: false, isYou: false },
        { address: '0x1m2n...o3p4', paid: true, isYou: false },
        { address: '0x5q6r...s7t8', paid: false, isYou: false },
        ...Array.from({ length: group.maxParticipants - 5 }, (_, i) => ({
            address: `Slot ${i + 6} available`,
            paid: false,
            isYou: false,
            isAvailable: true
        }))
    ];

    const paidCount = participants.filter(p => p.paid && !p.isAvailable).length;

    return (
        <div className="min-h-screen p-6 font-sans max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8 pt-4">
                <div className="flex items-center gap-4 mb-2">
                    <button
                        onClick={() => navigate('/')}
                        className="action-btn"
                    >
                        ← Back to Dashboard
                    </button>
                    <h1 className="text-3xl font-bold text-white">{group.name} DETAILS</h1>
                </div>
                <div className="glass-text-light">Detailed view of your pasanaku group</div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Pool Status */}
                <div className="card">
                    <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 bg-celo-green rounded-full"></span>
                        Pool Status
                    </h2>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="glass-text-light">Total Pool:</span>
                            <span className="text-white font-semibold text-lg">{group.poolAmount} USDC</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="glass-text-light">Current Round:</span>
                            <span className="text-white font-semibold">{group.currentRound} of {group.totalRounds}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="glass-text-light">Next Distribution:</span>
                            <span className="text-white font-semibold">2 days</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="glass-text-light">Your Turn:</span>
                            <span className="text-celo-green font-semibold">Round {group.yourTurn}</span>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="card">
                    <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 bg-circle-blue rounded-full"></span>
                        Quick Actions
                    </h2>
                    <div className="space-y-3">
                        <button
                            onClick={() => setPaymentModal({ open: true, groupId: group.name, amount: group.contribution })}
                            className="btn-primary w-full text-center"
                        >
                            Pay Contribution Fee
                        </button>
                        <button
                            onClick={() => setDistributionModal({
                                open: true,
                                groupId: group.name,
                                poolAmount: group.poolAmount,
                                recipient: '0x3e4f...g5h6'
                            })}
                            className="btn-secondary w-full text-center"
                        >
                            Distribute Pool
                        </button>
                        <button
                            onClick={() => setAlertModal({ open: true, groupId: group.name, amount: group.contribution })}
                            className="action-btn w-full text-center"
                        >
                            Set Payment Reminder
                        </button>
                    </div>
                </div>

                {/* Group Info */}
                <div className="card">
                    <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 bg-xmtp-yellow rounded-full"></span>
                        Group Info
                    </h2>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="glass-text-light">Contribution:</span>
                            <span className="text-white font-semibold">{group.contribution} USDC</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="glass-text-light">Frequency:</span>
                            <span className="text-white font-semibold">Weekly</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="glass-text-light">Status:</span>
                            <span className={`font-semibold ${
                                group.status === 'active' ? 'text-celo-green' :
                                    group.status === 'ready' ? 'text-circle-blue' : 'text-orange-400'
                            }`}>
                {group.status.toUpperCase()}
              </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="glass-text-light">Created:</span>
                            <span className="text-white font-semibold">2 weeks ago</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Participants List */}
            <div className="card mt-6">
                <h2 className="text-xl font-semibold text-white mb-4">
                    Participants ({paidCount}/{group.maxParticipants} paid)
                </h2>
                <div className="grid md:grid-cols-2 gap-3">
                    {participants.map((participant, index) => (
                        <div
                            key={index}
                            className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                                participant.isYou
                                    ? 'bg-celo-green/20 border-celo-green'
                                    : participant.isAvailable
                                        ? 'bg-white/5 border-white/10'
                                        : 'bg-white/10 border-white/20'
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-2 h-2 rounded-full ${
                                    participant.paid ? 'bg-green-400' :
                                        participant.isAvailable ? 'bg-gray-400' : 'bg-yellow-400'
                                }`}></div>
                                <span className={`${
                                    participant.isYou ? 'text-celo-green font-semibold' : 'text-white'
                                }`}>
                  {participant.address}
                                    {participant.isYou && ' (You)'}
                </span>
                            </div>
                            <div>
                                {participant.isAvailable ? (
                                    <span className="text-gray-400 text-sm">Available</span>
                                ) : participant.paid ? (
                                    <span className="badge-active">Paid</span>
                                ) : (
                                    <span className="badge-waiting">Pending</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Round History */}
            <div className="card mt-6">
                <h2 className="text-xl font-semibold text-white mb-4">Round History</h2>
                <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                        <div className="flex items-center gap-3">
                            <span className="text-green-400">✅</span>
                            <div>
                                <div className="text-white">Round 1: Completed</div>
                                <div className="text-xs glass-text-light">0x1a2b...c3d4 received 80 USDC</div>
                            </div>
                        </div>
                        <div className="text-xs glass-text-light">1 week ago</div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                        <div className="flex items-center gap-3">
                            <span className="text-green-400">✅</span>
                            <div>
                                <div className="text-white">Round 2: Completed</div>
                                <div className="text-xs glass-text-light">0x7i8j...k9l0 received 80 USDC</div>
                            </div>
                        </div>
                        <div className="text-xs glass-text-light">3 days ago</div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-celo-green/10 rounded-lg border border-celo-green/30">
                        <div className="flex items-center gap-3">
                            <span className="text-yellow-400">🎯</span>
                            <div>
                                <div className="text-white font-semibold">Round 3: In Progress</div>
                                <div className="text-xs glass-text-light">0x3e4f...g5h6 will receive 80 USDC</div>
                            </div>
                        </div>
                        <div className="text-xs glass-text-light">Current</div>
                    </div>

                    {Array.from({ length: group.totalRounds - 3 }, (_, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                            <div className="flex items-center gap-3">
                                <span className="text-gray-400">⏳</span>
                                <div>
                                    <div className="text-gray-400">Round {i + 4}: Upcoming</div>
                                    <div className="text-xs text-gray-500">Waiting...</div>
                                </div>
                            </div>
                            <div className="text-xs text-gray-500">Future</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modales */}
            <PaymentModal
                isOpen={paymentModal.open}
                onClose={() => setPaymentModal({ open: false, groupId: '', amount: '' })}
                groupId={paymentModal.groupId}
                amount={paymentModal.amount}
            />

            <DistributionModal
                isOpen={distributionModal.open}
                onClose={() => setDistributionModal({ open: false, groupId: '', poolAmount: '', recipient: '' })}
                groupId={distributionModal.groupId}
                poolAmount={distributionModal.poolAmount}
                recipient={distributionModal.recipient}
            />

            <SetAlertModal
                isOpen={alertModal.open}
                onClose={() => setAlertModal({ open: false, groupId: '', amount: '' })}
                groupId={alertModal.groupId}
                amount={alertModal.amount}
            />
        </div>
    );
};

export default GroupDetails;