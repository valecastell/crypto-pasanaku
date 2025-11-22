import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateGroup: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        contribution: '',
        participants: '',
        rounds: '',
        frequency: 'weekly'
    });
    const [isCreating, setIsCreating] = useState(false);

    const handleCreateGroup = async () => {
        if (!formData.contribution || !formData.participants || !formData.rounds) {
            alert('Please fill all fields');
            return;
        }

        setIsCreating(true);

        // Simular creación de grupo (2 seeg)
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Simular éxito
        console.log('Group created with:', formData);

        // Redirigir
        navigate('/');

        setIsCreating(false);
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
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
                    <h1 className="text-3xl font-bold text-white">Create New Pasanaku</h1>
                </div>
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
                            value={formData.contribution}
                            onChange={(e) => handleInputChange('contribution', e.target.value)}
                            placeholder="Enter amount in USDC"
                            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-celo-green"
                        />
                    </div>

                    {/* Number Participants */}
                    <div>
                        <label className="block glass-text-light text-sm font-medium mb-2">
                            Number of Participants
                        </label>
                        <input
                            type="number"
                            value={formData.participants}
                            onChange={(e) => handleInputChange('participants', e.target.value)}
                            placeholder="How many people in the group?"
                            min="2"
                            max="20"
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
                            value={formData.rounds}
                            onChange={(e) => handleInputChange('rounds', e.target.value)}
                            placeholder="Total rounds for the group"
                            min="1"
                            max="12"
                            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-xmtp-yellow"
                        />
                    </div>

                    {/* Payment Frequency */}
                    <div>
                        <label className="block glass-text-light text-sm font-medium mb-2">
                            Payment Frequency
                        </label>
                        <select
                            value={formData.frequency}
                            onChange={(e) => handleInputChange('frequency', e.target.value)}
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
                    <div className="text-xs glass-text-light mt-1">
                        This creates a smart contract on the Celo blockchain
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-8">
                    <button
                        onClick={handleCreateGroup}
                        disabled={isCreating}
                        className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {isCreating ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Creating Group...
                            </>
                        ) : (
                            <>
                                <span>📝</span>
                                Create Smart Contract
                            </>
                        )}
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        disabled={isCreating}
                        className="action-btn flex-1 disabled:opacity-50"
                    >
                        Cancel
                    </button>
                </div>
            </div>

            {/* Sponsor  */}
            <div className="mt-8 flex justify-center gap-6">
                <div className="text-center">
                    <div className="text-celo-green font-semibold">Celo Blockchain</div>
                    <div className="text-xs glass-text-light">Low gas fees</div>
                </div>
                <div className="text-center">
                    <div className="text-circle-blue font-semibold">USDC Stablecoin</div>
                    <div className="text-xs glass-text-light">Stable payments</div>
                </div>
            </div>
        </div>
    );
};

export default CreateGroup;