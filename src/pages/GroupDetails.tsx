import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const GroupDetails: React.FC = () => {
    const { groupId } = useParams();
    const navigate = useNavigate();

    // Datos de ejemplo - en producción vendrían del contrato
    const groupData = {
        id: groupId || '#1234',
        pool: '80 USDC',
        currentRound: 3,
        totalRounds: 8,
        nextDistribution: '2 days',
        participants: [
            { address: '0x1a2b...c3d4', paid: true },
            { address: '0x3e4f...g5h6', paid: true },
            { address: '0x7i8j...k9l0', paid: false },
            { address: '0x1m2n...o3p4', paid: true },
            { address: '0x5q6r...s7t8', paid: false },
        ]
    };

    return (
        <div className="min-h-screen p-6 font-sans max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8 pt-4">
                <div className="flex items-center gap-4 mb-2">
                    <button
                        onClick={() => navigate('/')}
                        className="action-btn"
                    >
                        ← Back
                    </button>
                    <h1 className="text-3xl font-bold text-white">GROUP {groupData.id} DETAILS</h1>
                </div>
                <div className="glass-text-light">Detailed view of your pasanaku group</div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Pool Status */}
                <div className="card">
                    <h2 className="text-xl font-semibold text-white mb-4">Pool Status</h2>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="glass-text-light">Total Pool:</span>
                            <span className="text-white font-semibold">{groupData.pool}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="glass-text-light">Current Round:</span>
                            <span className="text-white font-semibold">{groupData.currentRound} of {groupData.totalRounds}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="glass-text-light">Next Distribution:</span>
                            <span className="text-white font-semibold">{groupData.nextDistribution}</span>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="card">
                    <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
                    <div className="space-y-3">
                        <button className="btn-primary w-full">
                            Pay Contribution Fee
                        </button>
                        <button className="btn-secondary w-full">
                            Distribute Pool
                        </button>
                        <button className="action-btn w-full">
                            Send Message to Group
                        </button>
                    </div>
                </div>
            </div>

            {/* Participants List */}
            <div className="card mt-6">
                <h2 className="text-xl font-semibold text-white mb-4">
                    Participants ({groupData.participants.filter(p => p.paid).length}/{groupData.participants.length} paid)
                </h2>
                <div className="space-y-3">
                    {groupData.participants.map((participant, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                            <span className="text-white">{participant.address}</span>
                            {participant.paid ? (
                                <span className="badge-active">Paid</span>
                            ) : (
                                <span className="badge-waiting">Pending</span>
                            )}
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
                            <span className="text-white">Round 1: 0x1a2b...c3d4 - 80 USDC</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                        <div className="flex items-center gap-3">
                            <span className="text-green-400">✅</span>
                            <span className="text-white">Round 2: 0x7i8j...k9l0 - 80 USDC</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                        <div className="flex items-center gap-3">
                            <span className="text-yellow-400">🎯</span>
                            <span className="text-white">Round 3: 0x3e4f...g5h6 - In progress</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GroupDetails;