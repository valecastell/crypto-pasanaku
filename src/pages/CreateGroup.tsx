import React, { useState } from 'react';

const CreateGroup: React.FC = () => {
    const [contribution, setContribution] = useState('');
    const [participants, setParticipants] = useState('');
    const [rounds, setRounds] = useState('');
    const [frequency, setFrequency] = useState('weekly');

    return (
        <div className="min-h-screen p-6 font-sans max-w-2xl mx-auto">
            {/* Header */}
            <div className="mb-8 pt-4">
                <h1 className="text-3xl font-bold text-white mb-2">Create New Pasanaku</h1>
                <div className="glass-text-light">Set up your community savings group</div>
            </div>

            {/* Form */}
            <div className="card">
                <h2 className="text-xl font-semibold text-white mb-6">Group Settings</h2>

                <div className="space-y-6">
                    {/* Contribution Amount */}
                    <div>
                        <label className="block glass-text-light text-sm font-medium mb-2">
                            Contribution Amount (USDC)
                        </label>
                        <input
                            type="number"
                            value={contribution}
                            onChange={(e) => setContribution(e.target.value)}
                            placeholder="Enter amount in USDC"
                            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-celo-green"
                        />
                    </div>

                    {/* Number of Participants */}
                    <div>
                        <label className="block glass-text-light text-sm font-medium mb-2">
                            Number of Participants
                        </label>
                        <input
                            type="number"
                            value={participants}
                            onChange={(e) => setParticipants(e.target.value)}
                            placeholder="How many people in the group?"
                            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-circle-blue"
                        />
                    </div>

                    {/* Number of Rounds */}
                    <div>
                        <label className="block glass-text-light text-sm font-medium mb-2">
                            Number of Rounds
                        </label>
                        <input
                            type="number"
                            value={rounds}
                            onChange={(e) => setRounds(e.target.value)}
                            placeholder="Total rounds for the group"
                            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-xmtp-yellow"
                        />
                    </div>

                    {/* Payment Frequency */}
                    <div>
                        <label className="block glass-text-light text-sm font-medium mb-2">
                            Payment Frequency
                        </label>
                        <select
                            value={frequency}
                            onChange={(e) => setFrequency(e.target.value)}
                            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-celo-green"
                        >
                            <option value="daily" className="bg-gray-800">Daily</option>
                            <option value="weekly" className="bg-gray-800">Weekly</option>
                            <option value="monthly" className="bg-gray-800">Monthly</option>
                        </select>
                    </div>
                </div>

                {/* Gas Fee Estimate */}
                <div className="mt-6 p-4 bg-white/10 rounded-xl">
                    <div className="text-sm glass-text-light">
                        Estimated gas fee: <span className="text-white font-semibold">~0.002 CELO</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-8">
                    <button className="btn-primary flex-1">
                        Deploy Smart Contract
                    </button>
                    <button className="action-btn flex-1">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateGroup;