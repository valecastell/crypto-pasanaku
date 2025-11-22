import React, { createContext, useContext, useState, type ReactNode } from 'react';

// Interfaces
export interface Group {
    id: number;
    name: string;
    poolAmount: string;
    participants: number;
    maxParticipants: number;
    currentRound: number;
    totalRounds: number;
    status: 'active' | 'waiting' | 'ready';
    contribution: string;
    yourTurn: number;
}

export interface Notification {
    id: number;
    type: 'payment' | 'distribution' | 'reminder';
    groupId: number;
    title: string;
    message: string;
    timestamp: Date;
}

// Datos simulados
const mockGroups: Group[] = [
    {
        id: 1,
        name: 'GROUP #1234',
        poolAmount: '80',
        participants: 4,
        maxParticipants: 8,
        currentRound: 3,
        totalRounds: 8,
        status: 'active',
        contribution: '10',
        yourTurn: 5
    },
    {
        id: 2,
        name: 'GROUP #5678',
        poolAmount: '150',
        participants: 4,
        maxParticipants: 4,
        currentRound: 2,
        totalRounds: 4,
        status: 'ready',
        contribution: '25',
        yourTurn: 3
    },
    {
        id: 3,
        name: 'GROUP #8910',
        poolAmount: '40',
        participants: 2,
        maxParticipants: 6,
        currentRound: 1,
        totalRounds: 6,
        status: 'waiting',
        contribution: '10',
        yourTurn: 4
    }
];

const mockNotifications: Notification[] = [
    {
        id: 1,
        type: 'payment',
        groupId: 1,
        title: 'Payment Due - Group #1234',
        message: 'Your 10 USDC fee is due tomorrow',
        timestamp: new Date()
    },
    {
        id: 2,
        type: 'distribution',
        groupId: 2,
        title: 'Congratulations! - Group #5678',
        message: 'Everyone paid, you can distribute 150 USDC',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
        id: 3,
        type: 'reminder',
        groupId: 3,
        title: 'Reminder - Group #8910',
        message: '1 day left until your next payment',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000)
    }
];

interface AppContextType {
    groups: Group[];
    notifications: Notification[];
    refreshData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [groups] = useState<Group[]>(mockGroups);
    const [notifications] = useState<Notification[]>(mockNotifications);

    const refreshData = () => {
        console.log('Refreshing mock data...');
    };

    return (
        <AppContext.Provider value={{ groups, notifications, refreshData }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
};