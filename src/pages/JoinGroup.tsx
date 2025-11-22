import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JoinGroup: React.FC = () => {
    const [groupAddress, setGroupAddress] = useState('');
    const [foundGroup, setFoundGroup] = useState<any>(null);
    const navigate = useNavigate();

    const searchGroup = () => {
        // Simulación de búsqueda - en producción esto buscaría en blockchain
        if (groupAddress.trim()) {
            setFoundGroup({
                id: '#7890',
                contribution: '25 USDC',
                participants: '3/6',
                rounds: '6 total',
                creator: '0x1a2b...c3d4'
            });
        }
    };

    return (
        <div className="min-h-screen p-6 font-sans max-w-2xl mx-auto">
            {/* Header */}
            <div className="mb-8 pt-4">
                <h1 className="text-3xl font-bold text-white mb-2">Join Existing Group</h1>
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
                            className="btn-primary px-6"
                        >
                            Search Group
                        </button>
                    </div>
                </div>
            </div>

            {/* Group Found Section */}
            {foundGroup && (
                <div className="card">
                    <h2 className="text-xl font-semibold text-white mb-4">Group Found</h2>

                    <div className="bg-white/10 rounded-xl p-4 mb-6">
                        <div className="text-lg font-bold text-white mb-3">{foundGroup.id}</div>
                        <div className="space-y-2 glass-text-light text-sm">
                            <div>• Contribution: <span className="text-white font-semibold">{foundGroup.contribution}</span></div>
                            <div>• Participants: <span className="text-white font-semibold">{foundGroup.participants}</span></div>
                            <div>• Rounds: <span className="text-white font-semibold">{foundGroup.rounds}</span></div>
                            <div>• Creator: <span className="text-white font-semibold">{foundGroup.creator}</span></div>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button className="btn-primary flex-1">
                            Join Group
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
        </div>
    );
};

export default JoinGroup;