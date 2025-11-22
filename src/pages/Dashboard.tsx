import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen p-6 font-sans max-w-4xl mx-auto">
            {/* Header Mejorado */}
            <div className="mb-8 pt-4">
                <h1 className="text-3xl font-bold text-white mb-1">Crypto PasaNaku+</h1>
                <div className="flex items-center justify-between">
                    <div className="glass-text-light text-sm bg-white/20 rounded-lg px-3 py-1 shadow-lg backdrop-blur-sm">
                        👛 0x742d..Aa98
                    </div>
                    <div className="text-xs glass-text-light">Community Savings on Web3</div>
                </div>
            </div>

            {/* Balance Section - Mejorado */}
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

                    <button className="btn-secondary flex-1 flex items-center justify-center gap-2">
                        <span>👥</span>
                        Join Group
                    </button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Your Pasanaku Groups - Mejorado */}
                <div className="card">
                    <h2 className="text-lg font-semibold mb-4 text-gray-900 flex items-center gap-2">
                        <span className="w-2 h-2 bg-celo-green rounded-full"></span>
                        Your Pasanaku Groups
                    </h2>

                    {/* Group 1 */}
                    <div className="border border-gray-200 rounded-xl p-4 mb-4 hover:border-celo-green transition-colors">
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-gray-900">GROUP #1234</span>
                                <span className="badge-active">Active</span>
                            </div>
                        </div>
                        <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-sm">
                                <span className="text-gray-600">💰 Pool:</span>
                                <span className="font-semibold text-gray-900">80 USDC</span>
                                <span className="text-gray-400">•</span>
                                <span className="text-gray-600">👥 4/8 paid</span>
                            </div>
                            <div className="text-gray-500 text-sm">
                                🔄 Round 3 of 8 - <span className="text-celo-green font-medium">Your turn in round 5</span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="bg-celo-green text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors flex-1">
                                Pay Fee
                            </button>
                            <button
                                onClick={() => navigate('/group/1234')}
                                className="border border-gray-300 px-4 py-2 rounded-lg text-sm font-medium hover:border-gray-400 transition-colors">
                                View Details
                            </button>
                        </div>
                    </div>

                    {/* Group 2 */}
                    <div className="border border-gray-200 rounded-xl p-4 mb-4 hover:border-circle-blue transition-colors">
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-gray-900">GROUP #5678</span>
                                <span className="badge-ready">Ready</span>
                            </div>
                        </div>
                        <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-sm">
                                <span className="text-gray-600">💰 Pool:</span>
                                <span className="font-semibold text-gray-900">150 USDC</span>
                                <span className="text-gray-400">•</span>
                                <span className="text-gray-600">👥 4/4 paid ✅</span>
                            </div>
                            <div className="text-gray-500 text-sm">
                                🔄 Round 2 of 4 - <span className="text-circle-blue font-medium">READY TO DISTRIBUTE</span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="bg-circle-blue text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors flex-1">
                                Distribute Pool
                            </button>
                            <button
                                onClick={() => navigate('/group/1234')}
                                className="border border-gray-300 px-4 py-2 rounded-lg text-sm font-medium hover:border-gray-400 transition-colors">
                                View Details
                            </button>
                        </div>
                    </div>

                    {/* Group 3 */}
                    <div className="border border-gray-200 rounded-xl p-4 hover:border-xmtp-yellow transition-colors">
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-gray-900">GROUP #8910</span>
                                <span className="badge-waiting">Waiting</span>
                            </div>
                        </div>
                        <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-sm">
                                <span className="text-gray-600">💰 Pool:</span>
                                <span className="font-semibold text-gray-900">40 USDC</span>
                                <span className="text-gray-400">•</span>
                                <span className="text-gray-600">👥 2/6 paid</span>
                            </div>
                            <div className="text-gray-500 text-sm">
                                🔄 Round 1 of 6 - <span className="text-orange-500 font-medium">Waiting for payments</span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="bg-celo-green text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors flex-1">
                                Pay Fee
                            </button>
                            <button
                                onClick={() => navigate('/group/1234')}
                                className="border border-gray-300 px-4 py-2 rounded-lg text-sm font-medium hover:border-gray-400 transition-colors">
                                View Details
                            </button>
                        </div>
                    </div>
                </div>

                {/* XMTP Notifications - Mejorado */}
                <div className="card">
                    <h2 className="text-lg font-semibold mb-4 text-gray-900 flex items-center gap-2">
                        <span className="w-2 h-2 bg-xmtp-yellow rounded-full"></span>
                        XMTP Notifications
                    </h2>

                    {/* Notification 1 */}
                    <div className="border border-gray-200 rounded-xl p-4 mb-4 hover:border-celo-green transition-colors">
                        <div className="font-semibold text-sm mb-2 text-gray-900">🎯 Payment Due - Group #1234</div>
                        <div className="text-gray-600 text-sm mb-3">Your 10 USDC fee is due tomorrow</div>
                        <button className="bg-celo-green text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors w-full">
                            Pay Now
                        </button>
                    </div>

                    {/* Notification 2 */}
                    <div className="border border-gray-200 rounded-xl p-4 mb-4 hover:border-circle-blue transition-colors">
                        <div className="font-semibold text-sm mb-2 text-gray-900">🎉 Congratulations! - Group #5678</div>
                        <div className="text-gray-600 text-sm mb-3">Everyone paid, you can distribute 150 USDC</div>
                        <button className="bg-circle-blue text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors w-full">
                            Distribute
                        </button>
                    </div>

                    {/* Notification 3 */}
                    <div className="border border-gray-200 rounded-xl p-4 hover:border-xmtp-yellow transition-colors">
                        <div className="font-semibold text-sm mb-2 text-gray-900">👋 New Message - Group #1234</div>
                        <div className="text-gray-600 text-sm mb-3">Is everyone ready for the next round?</div>
                        <button className="bg-xmtp-yellow text-gray-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-400 transition-colors w-full">
                            Reply
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer con Sponsors */}
            <div className="mt-8 text-center text-gray-500 text-sm">
                <div className="flex justify-center items-center gap-6 mb-2">
                    <span className="font-semibold text-celo-green">Celo</span>
                    <span className="font-semibold text-circle-blue">Circle USDC</span>
                    <span className="font-semibold text-xmtp-yellow">XMTP</span>
                </div>
                Built for ETH Global Hackathon
            </div>
        </div>
    );
};

export default Dashboard;