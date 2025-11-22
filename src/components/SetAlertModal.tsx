import React, { useState } from 'react';

interface SetAlertModalProps {
    isOpen: boolean;
    onClose: () => void;
    groupId: string;
    amount: string;
}

const SetAlertModal: React.FC<SetAlertModalProps> = ({ isOpen, onClose, groupId, amount }) => {
    const [selectedAlerts, setSelectedAlerts] = useState<string[]>(['1-day']);
    const [showCustom, setShowCustom] = useState(false);
    const [customTime, setCustomTime] = useState({ days: '0', hours: '1' });

    const alertOptions = [
        {
            value: '1-day',
            label: '1 day before',
            description: 'Perfect timing to prepare',
            emoji: '📅'
        },
        {
            value: '12-hours',
            label: '12 hours before',
            description: 'Morning reminder',
            emoji: '🌅'
        },
        {
            value: '1-hour',
            label: '1 hour before',
            description: 'Last call reminder',
            emoji: '⚡'
        },
    ];

    const toggleAlert = (value: string) => {
        if (selectedAlerts.includes(value)) {
            setSelectedAlerts(selectedAlerts.filter(alert => alert !== value));
        } else {
            setSelectedAlerts([...selectedAlerts, value]);
        }
    };

    const handleSave = () => {
        console.log('XMTP Alerts set for:', selectedAlerts);
        onClose();
    };

    const handleCustomSave = () => {
        const days = parseInt(customTime.days);
        const hours = parseInt(customTime.hours);
        const totalHours = (days * 24) + hours;

        if (totalHours > 0) {
            console.log(`Custom XMTP alert set for ${totalHours} hours before`);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="card max-w-md w-full">
                {/* Header */}
                <div className="text-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-xmtp-yellow to-yellow-400 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-xl">⏰</span>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Set Reminders</h2>
                    <p className="glass-text-light text-sm">Get notified before your payment is due</p>
                </div>

                {/* Group Info */}
                <div className="bg-white/10 rounded-xl p-4 mb-6">
                    <div className="flex items-center justify-between text-sm">
                        <div>
                            <div className="glass-text-light">Group</div>
                            <div className="text-white font-semibold">{groupId}</div>
                        </div>
                        <div className="text-right">
                            <div className="glass-text-light">Amount</div>
                            <div className="text-white font-semibold">{amount} USDC</div>
                        </div>
                    </div>
                </div>

                {/* Quick Select Options */}
                <div className="mb-6">
                    <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-xmtp-yellow rounded-full"></span>
                        Select Reminders (Multiple)
                    </h3>

                    <div className="grid gap-2">
                        {alertOptions.map((option) => (
                            <div
                                key={option.value}
                                onClick={() => toggleAlert(option.value)}
                                className={`p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
                                    selectedAlerts.includes(option.value)
                                        ? 'border-xmtp-yellow bg-xmtp-yellow/10'
                                        : 'border-white/10 bg-white/5 hover:border-white/20'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                        selectedAlerts.includes(option.value)
                                            ? 'border-xmtp-yellow bg-xmtp-yellow'
                                            : 'border-white/30'
                                    }`}>
                                        {selectedAlerts.includes(option.value) && (
                                            <span className="text-black text-xs">✓</span>
                                        )}
                                    </div>
                                    <span className="text-xl">{option.emoji}</span>
                                    <div className="flex-1">
                                        <div className="text-white font-medium text-sm">{option.label}</div>
                                        <div className="text-xs glass-text-light">{option.description}</div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Custom Option */}
                        <div
                            onClick={() => setShowCustom(!showCustom)}
                            className={`p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
                                showCustom
                                    ? 'border-xmtp-yellow bg-xmtp-yellow/10'
                                    : 'border-white/10 bg-white/5 hover:border-white/20'
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                    showCustom
                                        ? 'border-xmtp-yellow bg-xmtp-yellow'
                                        : 'border-white/30'
                                }`}>
                                    {showCustom && (
                                        <span className="text-black text-xs">✓</span>
                                    )}
                                </div>
                                <span className="text-xl">🎯</span>
                                <div className="flex-1">
                                    <div className="text-white font-medium text-sm">Add custom time</div>
                                    <div className="text-xs glass-text-light">Set your own reminder</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Custom Time Selector */}
                {showCustom && (
                    <div className="mb-4 p-4 bg-white/5 rounded-lg border border-white/10">
                        <h4 className="text-white font-medium text-sm mb-3">Custom Reminder</h4>
                        <div className="flex items-center gap-3">
                            <div className="flex-1">
                                <label className="text-xs glass-text-light block mb-1">Days</label>
                                <input
                                    type="number"
                                    min="0"
                                    max="30"
                                    value={customTime.days}
                                    onChange={(e) => setCustomTime({...customTime, days: e.target.value})}
                                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-xmtp-yellow"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="text-xs glass-text-light block mb-1">Hours</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="23"
                                    value={customTime.hours}
                                    onChange={(e) => setCustomTime({...customTime, hours: e.target.value})}
                                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-xmtp-yellow"
                                />
                            </div>
                        </div>
                        <div className="text-xs glass-text-light mt-2">
                            {parseInt(customTime.days) > 0 || parseInt(customTime.hours) > 0 ? (
                                `Reminder will be sent ${parseInt(customTime.days) > 0 ? `${customTime.days} day${customTime.days === '1' ? '' : 's'} and ` : ''}${customTime.hours} hour${customTime.hours === '1' ? '' : 's'} before`
                            ) : (
                                'Please set at least 1 hour'
                            )}
                        </div>
                    </div>
                )}

                {/* Selected Alerts Summary */}
                {selectedAlerts.length > 0 && (
                    <div className="mb-4 p-3 bg-green-500/10 rounded-lg border border-green-400/20">
                        <div className="flex items-center gap-2 text-sm">
                            <span className="text-green-400">✅</span>
                            <span className="text-white">
                {selectedAlerts.length} reminder{selectedAlerts.length > 1 ? 's' : ''} selected
              </span>
                        </div>
                    </div>
                )}

                {/* XMTP Badge */}
                <div className="flex items-center justify-center gap-2 mb-4 p-3 bg-xmtp-yellow/10 rounded-lg border border-xmtp-yellow/20">
                    <span className="text-lg">📬</span>
                    <span className="text-white text-sm font-medium">Powered by XMTP</span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                    <button
                        onClick={showCustom ? handleCustomSave : handleSave}
                        className="btn-primary flex-1 flex items-center justify-center gap-2 py-3"
                    >
                        <span>💾</span>
                        Save {selectedAlerts.length > 0 ? `${selectedAlerts.length} ` : ''}Reminder{selectedAlerts.length > 1 ? 's' : ''}
                    </button>
                    <button
                        onClick={onClose}
                        className="action-btn flex-1 py-3"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SetAlertModal;