import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JoinGroup: React.FC = () => {
    const [groupAddress, setGroupAddress] = useState('');
    const [foundGroup, setFoundGroup] = useState<any>(null);
    const [isSearching, setIsSearching] = useState(false);
    const [isJoining, setIsJoining] = useState(false);
    const navigate = useNavigate();

    const searchGroup = async () => {
        if (!groupAddress.trim()) {
            alert('Please enter a group ID or address');
            return;
        }

        setIsSearching(true);

        // Simular búsqueda (1.5 segundos)
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Simular grupo encontrado
        setFoundGroup({
            id: '#7890',
            contribution: '25 USDC',
            participants: '3/6',
            rounds: '6 total',
            creator: '0x1a2b...c3d4',
            status: 'active',
            nextRound: '2 days'
        });

        setIsSearching(false);
    };

    const joinGroup = async () => {
        if (!foundGroup) return;

        setIsJoining(true);

        // Simular unión al grupo (2 segundos)
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Simular éxito
        console.log('Joined group:', foundGroup);

        // Redirigir al dashboard
        navigate('/');

        setIsJoining(false);
    };

    return (
        <div className="min-h-screen p-6 font-sans max-w-2xl mx-auto">
            {/* Header */}
            <div className="mb-8 pt-4">
                <div className="flex items-center gap-4 mb-2">
                    <button
                        onClick={() => navigate('/')}
                        className="action-btn"
                    >
                        ← Back to Dashboard
                    </button>
                    <h1 className="text-3xl font-bold text-white">Join Existing Group</h1>
                </div>
                <div className="glass-text-light">Enter the group ID or contract address</div>
            </div>

            {/* Search Section */}
            <div className="card mb-6">
                <div className="mb-4">
                    <label className="block glass-text-light text-sm font-medium mb-2">
                        Group ID or Contract Address
                    </label>
                    <div className="flex gap-3">
                        <input
                            type="text"
                            value={groupAddress}
                            onChange={(e) => setGroupAddress(e.target.value)}
                            placeholder="Enter group ID or 0x..."
                            className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-celo-green"
                        />
                        <button
                            onClick={searchGroup}
                            disabled={isSearching}
                            className="btn-primary px-6 disabled:opacity-50"
                        >
                            {isSearching ? (
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                'Search Group'
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Group Found Section */}
            {foundGroup && (
                <div className="card">
                    <h2 className="text-xl font-semibold text-white mb-4">✅ Group Found</h2>

                    <div className="bg-white/10 rounded-xl p-4 mb-6">
                        <div className="flex items-center justify-between mb-3">
                            <div className="text-lg font-bold text-white">{foundGroup.id}</div>
                            <span className="badge-active">{foundGroup.status}</span>
                        </div>
                        <div className="space-y-2 glass-text-light text-sm">
                            <div className="flex justify-between">
                                <span>Contribution:</span>
                                <span className="text-white font-semibold">{foundGroup.contribution}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Participants:</span>
                                <span className="text-white font-semibold">{foundGroup.participants}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Total Rounds:</span>
                                <span className="text-white font-semibold">{foundGroup.rounds}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Next Round:</span>
                                <span className="text-white font-semibold">{foundGroup.nextRound}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Creator:</span>
                                <span className="text-white font-semibold">{foundGroup.creator}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={joinGroup}
                            disabled={isJoining}
                            className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {isJoining ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Joining...
                                </>
                            ) : (
                                <>
                                    <span>👥</span>
                                    Join Group
                                </>
                            )}
                        </button>
                        <button
                            onClick={() => navigate('/')}
                            className="action-btn flex-1"
                        >
                            Back
                        </button>
                    </div>
                </div>
            )}

            {/* Help Text */}
            {!foundGroup && (
                <div className="text-center glass-text-light text-sm mt-8">
                    <p>Ask the group creator for the Group ID or Contract Address</p>
                    <p className="mt-2">This will be a 0x... address on the Celo blockchain</p>
                </div>
            )}
        </div>
    );
};

export default JoinGroup;