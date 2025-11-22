import React, { useState } from 'react';

interface XMTPNotification {
    id: number;
    type: 'payment' | 'distribution' | 'reminder' | 'system';
    title: string;
    message: string;
    timestamp: Date;
    status: 'sent' | 'delivered' | 'read';
}

const XMTPNotifications: React.FC = () => {
    const [notifications, setNotifications] = useState<XMTPNotification[]>([
        {
            id: 1,
            type: 'system',
            title: 'Welcome to Crypto PasaNaku+!',
            message: 'You can now receive secure notifications via XMTP',
            timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
            status: 'read'
        },
        {
            id: 2,
            type: 'payment',
            title: 'Payment Confirmed',
            message: 'Your contribution of 10 USDC to GROUP #1234 was successful',
            timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
            status: 'delivered'
        },
        {
            id: 3,
            type: 'distribution',
            title: 'Pool Distributed',
            message: '150 USDC has been distributed to 0x3e4f...g5h6 in GROUP #5678',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
            status: 'sent'
        },
        {
            id: 4,
            type: 'reminder',
            title: 'Payment Reminder',
            message: 'Your next payment of 10 USDC is due in 1 day for GROUP #8910',
            timestamp: new Date(),
            status: 'sent'
        }
    ]);

    const markAsRead = (id: number) => {
        setNotifications(notifications.map(notif =>
            notif.id === id ? { ...notif, status: 'read' } : notif
        ));
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'sent': return '📤';
            case 'delivered': return '📨';
            case 'read': return '👁️';
            default: return '📬';
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'payment': return '💳';
            case 'distribution': return '💰';
            case 'reminder': return '⏰';
            case 'system': return '🤖';
            default: return '📢';
        }
    };

    const formatTime = (date: Date) => {
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));

        if (hours < 1) return 'Just now';
        if (hours < 24) return `${hours}h ago`;
        return `${Math.floor(hours / 24)}d ago`;
    };

    return (
        <div className="card">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                    <span className="w-2 h-2 bg-xmtp-yellow rounded-full"></span>
                    XMTP Notifications
                </h2>
                <div className="bg-xmtp-yellow/20 text-xmtp-yellow text-xs font-medium px-2 py-1 rounded-full border border-xmtp-yellow/30">
                    Secure
                </div>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                    <div
                        key={notification.id}
                        onClick={() => markAsRead(notification.id)}
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${
                            notification.status === 'read'
                                ? 'bg-white/5 border-white/10'
                                : 'bg-xmtp-yellow/10 border-xmtp-yellow/30'
                        } hover:border-xmtp-yellow/50`}
                    >
                        <div className="flex items-start gap-3">
                            <div className="text-lg">
                                {getTypeIcon(notification.type)}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <div className={`text-sm font-semibold ${
                                        notification.status === 'read' ? 'text-white' : 'text-xmtp-yellow'
                                    }`}>
                                        {notification.title}
                                    </div>
                                    <div className="text-xs glass-text-light">
                                        {getStatusIcon(notification.status)} {formatTime(notification.timestamp)}
                                    </div>
                                </div>
                                <div className="text-sm glass-text-light">
                                    {notification.message}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* XMTP Features */}
            <div className="mt-4 p-3 bg-xmtp-yellow/10 rounded-lg border border-xmtp-yellow/20">
                <div className="text-xs glass-text-light text-center">
                    <span className="text-xmtp-yellow font-semibold">XMTP Features:</span>{' '}
                    End-to-end encryption • Decentralized • Wallet-to-wallet
                </div>
            </div>
        </div>
    );
};

export default XMTPNotifications;