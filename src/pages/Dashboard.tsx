import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import WalletConnect from '../components/wallet/WalletConnect';
import PaymentModal from '../components/PaymentModal';
import DistributionModal from '../components/DistributionModal';
import SetAlertModal from '../components/SetAlertModal';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const { groups, notifications } = useApp();
    const [paymentModal, setPaymentModal] = useState({ open: false, groupId: '', amount: '' });
    const [distributionModal, setDistributionModal] = useState({ open: false, groupId: '', poolAmount: '', recipient: '' });
    const [alertModal, setAlertModal] = useState({ open: false, groupId: '', amount: '' });

    return (
        <div className="min-h-screen p-6 font-sans max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8 pt-4">
                <h1 className="text-3xl font-bold text-white mb-1">Crypto PasaNaku+</h1>
                <div className="flex items-center justify-between">
                    <WalletConnect />
                    <div className="text-xs glass-text-light">Community Savings on Web3</div>
                </div>
            </div>

            {/* Balance Section */}
            <div className="card balance-header mb-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <div className="glass-text-light text-sm font-medium">Total in Pasanakus</div>
                        <div className="text-4xl font-bold text-white mt-1">$847.32</div>
                        <div className="text-green-300 text-sm font-medium mt-1 flex items-center">
                            <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                            +$320.15 next payment
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="glass-text-light text-sm font-medium">ETH Balance</div>
                        <div className="text-xl font-bold text-white">4.2589 ETH</div>
                    </div>
                </div>

                <div className="flex gap-3 mt-6">
                    <button
                        onClick={() => navigate('/create-group')}
                        className="btn-primary flex-1 flex items-center justify-center gap-2"
                    >
                        <span>+</span>
                        Create Group
                    </button>
                    <button
                        onClick={() => navigate('/join-group')}
                        className="btn-secondary flex-1 flex items-center justify-center gap-2"
                    >
                        <span>👥</span>
                        Join Group
                    </button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Your Pasanaku Groups */}
                <div className="card">
                    <h2 className="text-lg font-semibold mb-4 text-white flex items-center gap-2">
                        <span className="w-2 h-2 bg-celo-green rounded-full"></span>
                        Your Pasanaku Groups
                    </h2>

                    {groups.map((group) => (
                        <div key={group.id} className="border border-white/20 rounded-xl p-4 mb-4 hover:border-celo-green transition-colors bg-white/10">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-white">{group.name}</span>
                                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                                        group.status === 'active' ? 'badge-active' :
                                            group.status === 'ready' ? 'badge-ready' : 'badge-waiting'
                                    }`}>
                                        {group.status.charAt(0).toUpperCase() + group.status.slice(1)}
                                    </span>
                                </div>
                            </div>
                            <div className="space-y-2 mb-4">
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="glass-text-light">💰 Pool:</span>
                                    <span className="font-semibold text-white">{group.poolAmount} USDC</span>
                                    <span className="glass-text-light">•</span>
                                    <span className="glass-text-light">👥 {group.participants}/{group.maxParticipants} paid</span>
                                </div>
                                <div className="glass-text-light text-sm">
                                    🔄 Round {group.currentRound} of {group.totalRounds} - {' '}
                                    <span className={
                                        group.status === 'active' ? 'text-celo-green font-medium' :
                                            group.status === 'ready' ? 'text-circle-blue font-medium' :
                                                'text-orange-400 font-medium'
                                    }>
                                        {group.status === 'active' ? `Your turn in round ${group.yourTurn}` :
                                            group.status === 'ready' ? 'READY TO DISTRIBUTE' :
                                                'Waiting for payments'}
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setPaymentModal({
                                        open: true,
                                        groupId: group.name,
                                        amount: group.contribution
                                    })}
                                    className="bg-celo-green text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors flex-1"
                                >
                                    Pay Fee
                                </button>
                                <button
                                    onClick={() => navigate(`/group/${group.id}`)}
                                    className="border border-white/20 px-4 py-2 rounded-lg text-sm font-medium hover:border-white/40 transition-colors text-white"
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* XMTP Notifications - VERSIÓN MEJORADA PERO CON BOTONES FUNCIONALES */}
                <div className="card">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                            <span className="w-2 h-2 bg-xmtp-yellow rounded-full"></span>
                            XMTP Notifications
                        </h2>
                        <div className="bg-xmtp-yellow/20 text-xmtp-yellow text-xs font-medium px-2 py-1 rounded-full border border-xmtp-yellow/30">
                            Secure
                        </div>
                    </div>

                    {notifications.map((notification) => (
                        <div key={notification.id} className="border border-white/20 rounded-xl p-4 mb-4 hover:border-xmtp-yellow transition-colors bg-white/10">
                            <div className="flex items-start gap-3 mb-3">
                                <div className="text-lg">
                                    {notification.type === 'payment' ? '🎯' :
                                        notification.type === 'distribution' ? '🎉' : '⏰'}
                                </div>
                                <div className="flex-1">
                                    <div className="font-semibold text-sm text-white mb-1">
                                        {notification.title}
                                    </div>
                                    <div className="glass-text-light text-sm">
                                        {notification.message}
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                    if (notification.type === 'payment') {
                                        const group = groups.find(g => g.id === notification.groupId);
                                        setPaymentModal({
                                            open: true,
                                            groupId: group?.name || '',
                                            amount: group?.contribution || '10'
                                        });
                                    } else if (notification.type === 'distribution') {
                                        const group = groups.find(g => g.id === notification.groupId);
                                        setDistributionModal({
                                            open: true,
                                            groupId: group?.name || '',
                                            poolAmount: group?.poolAmount || '150',
                                            recipient: '0x3e4f...g5h6'
                                        });
                                    } else {
                                        const group = groups.find(g => g.id === notification.groupId);
                                        setAlertModal({
                                            open: true,
                                            groupId: group?.name || '',
                                            amount: group?.contribution || '10'
                                        });
                                    }
                                }}
                                className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    notification.type === 'payment' ? 'bg-celo-green text-white hover:bg-green-600' :
                                        notification.type === 'distribution' ? 'bg-circle-blue text-white hover:bg-blue-600' :
                                            'bg-xmtp-yellow text-gray-900 hover:bg-yellow-400'
                                }`}
                            >
                                {notification.type === 'payment' ? 'Pay Now' :
                                    notification.type === 'distribution' ? 'Distribute' : 'Set Alert'}
                            </button>
                        </div>
                    ))}

                    {/* XMTP Features Badge */}
                    <div className="mt-4 p-3 bg-xmtp-yellow/10 rounded-lg border border-xmtp-yellow/20">
                        <div className="text-xs glass-text-light text-center">
                            <span className="text-xmtp-yellow font-semibold">Powered by XMTP</span> • Secure wallet-to-wallet messaging
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center glass-text-light text-sm">
                <div className="flex justify-center items-center gap-6 mb-2">
                    <span className="font-semibold text-celo-green">Celo</span>
                    <span className="font-semibold text-circle-blue">Circle USDC</span>
                    <span className="font-semibold text-xmtp-yellow">XMTP</span>
                </div>
                Built for ETH Global Hackathon
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

export default Dashboard;