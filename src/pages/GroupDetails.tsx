// En pages/GroupDetails.tsx - VAMOS A ENRIQUECERLO
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import PaymentModal from '../components/PaymentModal';
import DistributionModal from '../components/DistributionModal';
import SetAlertModal from '../components/SetAlertModal';
import OnChainVerification from '../components/OnChainVerification';

const GroupDetails: React.FC = () => {
    const { groupId } = useParams();
    const navigate = useNavigate();
    const { groups } = useApp();
    const [paymentModal, setPaymentModal] = useState({ open: false, groupId: '', amount: '' });
    const [distributionModal, setDistributionModal] = useState({ open: false, groupId: '', poolAmount: '', recipient: '' });
    const [alertModal, setAlertModal] = useState({ open: false, groupId: '', amount: '' });
    const [activeTab, setActiveTab] = useState<'overview' | 'participants' | 'history'>('overview');

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

    // Datos mejorados
    const participants = [
        { address: '0x1a2b...c3d4', paid: true, isYou: true, joinDate: '2024-01-01', totalPaid: '160 USDC' },
        { address: '0x3e4f...g5h6', paid: true, isYou: false, joinDate: '2024-01-01', totalPaid: '160 USDC' },
        { address: '0x7i8j...k9l0', paid: false, isYou: false, joinDate: '2024-01-02', totalPaid: '80 USDC' },
        { address: '0x1m2n...o3p4', paid: true, isYou: false, joinDate: '2024-01-01', totalPaid: '160 USDC' },
        { address: '0x5q6r...s7t8', paid: false, isYou: false, joinDate: '2024-01-03', totalPaid: '40 USDC' },
    ];

    const roundHistory = [
        { round: 1, winner: '0x1a2b...c3d4', amount: '80 USDC', date: '2024-01-08', status: 'completed' },
        { round: 2, winner: '0x7i8j...k9l0', amount: '80 USDC', date: '2024-01-15', status: 'completed' },
        { round: 3, winner: '0x3e4f...g5h6', amount: '80 USDC', date: '2024-01-22', status: 'in-progress' },
        { round: 4, winner: 'Pending...', amount: '80 USDC', date: '2024-01-29', status: 'upcoming' },
    ];

    const paidCount = participants.filter(p => p.paid).length;
    const totalValue = parseInt(group.poolAmount) * group.maxParticipants;

    return (
        <div className="min-h-screen p-6 font-sans max-w-7xl mx-auto">
            {/* Header Mejorado */}
            <div className="mb-8 pt-4">
                <div className="flex items-center gap-4 mb-2">
                    <button
                        onClick={() => navigate('/')}
                        className="action-btn flex items-center gap-2"
                    >
                        <span>←</span>
                        Back to Dashboard
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold text-white">{group.name}</h1>
                        <div className="glass-text-light">Traditional savings circle on blockchain</div>
                    </div>
                    <div className={`text-xs font-bold px-3 py-1 rounded-full ${
                        group.status === 'active' ? 'badge-active' :
                            group.status === 'ready' ? 'badge-ready' : 'badge-waiting'
                    }`}>
                        {group.status.toUpperCase()}
                    </div>
                </div>
            </div>

            {/* Tabs de Navegación */}
            {/* Tabs Profesionales - Mejor Balance */}
            <div className="flex gap-1 mb-8 bg-white/5 rounded-2xl p-2 border border-white/10">
                {[
                    { id: 'overview', label: 'Overview', icon: '📊', count: null },
                    { id: 'participants', label: 'Participants', icon: '👥', count: participants.length },
                    { id: 'history', label: 'History', icon: '📜', count: roundHistory.length }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all flex-1 justify-center group ${
                            activeTab === tab.id
                                ? 'bg-gradient-to-r from-celo-green to-circle-blue text-white shadow-lg'
                                : 'text-white/70 hover:bg-white/10 hover:text-white'
                        }`}
                    >
            <span className="text-lg transition-transform group-hover:scale-110">
                {tab.icon}
            </span>
                        <div className="flex items-center gap-2">
                            <span className="font-medium">{tab.label}</span>
                            {tab.count !== null && (
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                    activeTab === tab.id
                                        ? 'bg-white/20 text-white'
                                        : 'bg-white/10 text-white/60'
                                }`}>
                        {tab.count}
                    </span>
                            )}
                        </div>
                    </button>
                ))}
            </div>

            {/* Contenido de Tabs */}
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Columna Izquierda - Siempre Visible */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Quick Actions Card */}
                    <div className="card">
                        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 bg-circle-blue rounded-full"></span>
                            Quick Actions
                        </h2>
                        <div className="space-y-3">
                            <button
                                onClick={() => setPaymentModal({ open: true, groupId: group.name, amount: group.contribution })}
                                className="btn-primary w-full text-center flex items-center justify-center gap-2"
                            >
                                <span>💳</span>
                                Pay Contribution
                            </button>
                            {group.status === 'ready' && (
                                <button
                                    onClick={() => setDistributionModal({
                                        open: true,
                                        groupId: group.name,
                                        poolAmount: group.poolAmount,
                                        recipient: '0x3e4f...g5h6'
                                    })}
                                    className="btn-secondary w-full text-center flex items-center justify-center gap-2"
                                >
                                    <span>💰</span>
                                    Distribute Pool
                                </button>
                            )}
                            <button
                                onClick={() => setAlertModal({ open: true, groupId: group.name, amount: group.contribution })}
                                className="action-btn w-full text-center flex items-center justify-center gap-2"
                            >
                                <span>⏰</span>
                                Set Reminders
                            </button>
                        </div>
                    </div>

                    {/* Group Stats */}
                    <div className="card">
                        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 bg-celo-green rounded-full"></span>
                            Group Stats
                        </h2>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="glass-text-light">Total Value:</span>
                                <span className="text-white font-semibold">{totalValue} USDC</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="glass-text-light">Participants:</span>
                                <span className="text-white font-semibold">{paidCount}/{group.maxParticipants}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="glass-text-light">Completion:</span>
                                <span className="text-white font-semibold">
                                    {Math.round((group.currentRound / group.totalRounds) * 100)}%
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="glass-text-light">Your Turn:</span>
                                <span className="text-celo-green font-semibold">Round {group.yourTurn}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Columna Derecha - Contenido Dinámico */}
                <div className="lg:col-span-2">
                    {activeTab === 'overview' && (
                        <div className="space-y-6">
                            {/* Pool Status */}
                            <div className="card">
                                <h2 className="text-xl font-semibold text-white mb-4">Pool Overview</h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="text-center p-4 bg-white/10 rounded-xl">
                                        <div className="text-3xl font-bold text-celo-green mb-2">{group.poolAmount} USDC</div>
                                        <div className="text-sm glass-text-light">Current Pool</div>
                                    </div>
                                    <div className="text-center p-4 bg-white/10 rounded-xl">
                                        <div className="text-3xl font-bold text-circle-blue mb-2">{group.currentRound}/{group.totalRounds}</div>
                                        <div className="text-sm glass-text-light">Rounds Completed</div>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="mt-4">
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="glass-text-light">Round Progress</span>
                                        <span className="text-white">Round {group.currentRound} of {group.totalRounds}</span>
                                    </div>
                                    <div className="w-full bg-white/20 rounded-full h-3">
                                        <div
                                            className="bg-gradient-to-r from-celo-green to-circle-blue h-3 rounded-full transition-all duration-500"
                                            style={{ width: `${(group.currentRound / group.totalRounds) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>

                            {/* On-Chain Verification */}
                            <OnChainVerification group={group} />
                        </div>
                    )}

                    {activeTab === 'participants' && (
                        <div className="card">
                            <h2 className="text-xl font-semibold text-white mb-4">
                                Participants ({paidCount}/{group.maxParticipants} paid)
                            </h2>
                            <div className="space-y-3">
                                {participants.map((participant, index) => (
                                    <div
                                        key={index}
                                        className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                                            participant.isYou
                                                ? 'bg-celo-green/20 border-celo-green'
                                                : 'bg-white/10 border-white/20'
                                        }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                                participant.paid ? 'bg-green-500/20' : 'bg-yellow-500/20'
                                            }`}>
                                                <span className={participant.paid ? 'text-green-400' : 'text-yellow-400'}>
                                                    {participant.paid ? '✓' : '...'}
                                                </span>
                                            </div>
                                            <div>
                                                <div className={`font-semibold ${
                                                    participant.isYou ? 'text-celo-green' : 'text-white'
                                                }`}>
                                                    {participant.address}
                                                    {participant.isYou && ' (You)'}
                                                </div>
                                                <div className="text-xs glass-text-light">
                                                    Joined {participant.joinDate} • {participant.totalPaid}
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            {participant.paid ? (
                                                <span className="badge-active">Paid</span>
                                            ) : (
                                                <span className="badge-waiting">Pending</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'history' && (
                        <div className="card">
                            <h2 className="text-xl font-semibold text-white mb-4">Round History</h2>
                            <div className="space-y-4">
                                {roundHistory.map((round, index) => (
                                    <div
                                        key={index}
                                        className={`flex items-center justify-between p-4 rounded-xl border ${
                                            round.status === 'completed' ? 'bg-white/10 border-white/20' :
                                                round.status === 'in-progress' ? 'bg-celo-green/20 border-celo-green' :
                                                    'bg-white/5 border-white/10'
                                        }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                                round.status === 'completed' ? 'bg-green-500/20' :
                                                    round.status === 'in-progress' ? 'bg-celo-green/20' :
                                                        'bg-gray-500/20'
                                            }`}>
                                                <span className={
                                                    round.status === 'completed' ? 'text-green-400' :
                                                        round.status === 'in-progress' ? 'text-celo-green' :
                                                            'text-gray-400'
                                                }>
                                                    {round.status === 'completed' ? '✓' :
                                                        round.status === 'in-progress' ? '🎯' : '⏳'}
                                                </span>
                                            </div>
                                            <div>
                                                <div className="font-semibold text-white">
                                                    Round {round.round}: {round.winner}
                                                </div>
                                                <div className="text-sm glass-text-light">
                                                    {round.amount} • {round.date}
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`text-sm font-semibold ${
                                            round.status === 'completed' ? 'text-green-400' :
                                                round.status === 'in-progress' ? 'text-celo-green' :
                                                    'text-gray-400'
                                        }`}>
                                            {round.status === 'completed' ? 'Completed' :
                                                round.status === 'in-progress' ? 'In Progress' : 'Upcoming'}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
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