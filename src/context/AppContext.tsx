import React, { createContext, useContext, useState, type ReactNode } from 'react';

const realTransactionHashes = [
    '0x09667974ea6637b76331d6a7b109b24261f1a655eb510dd559a17f1b33b3cdb4', // hashes recientes
    '0xb5bb6ec118d7a2cd44ead82f971e62e2fee2d327217850e7cd7d61a2f676584e',
    '0xba5d10a58cb474697c95854c54a366dc74a52fed003059f6654b78a0a1c1dc94',
    '0x94ffbfbe74fb13774b42872f9f03b063e86bb5641eadeefbfda3184c0dca8226',
    '0x1a96f6ad99a36dfbf7408ff8e7d05b0cd4a4fcab07d7d7d535158c67c7fff8e0'
];
//OBTIENE HASH ALEATORI
const getRandomTransactionHash = () => {
    return realTransactionHashes[Math.floor(Math.random() * realTransactionHashes.length)];
};

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

    // NUEVOS CAMPOS PARA BLOCKCHAIN
    contractAddress: string;
    createdBlock: number;
    nextDistribution: string | null;
    totalDistributed: string;
    onChainVerified: boolean;
    transactionHash?: string;
    creator: string;
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
        name: 'Familia López #001',
        poolAmount: '320',
        participants: 8,
        maxParticipants: 8,
        currentRound: 4,
        totalRounds: 8,
        status: 'active',
        contribution: '40',
        yourTurn: 6,
        contractAddress: '0x89a2b8c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9',
        createdBlock: 18452345,
        nextDistribution: '2024-01-15T18:00:00Z',
        totalDistributed: '960 USDC',
        onChainVerified: true,
        transactionHash: getRandomTransactionHash(),
        creator: '0x742d...c3e5'
    },
    {
        id: 2,
        name: 'Amigos Quito #002',
        poolAmount: '150',
        participants: 4,
        maxParticipants: 4,
        currentRound: 2,
        totalRounds: 4,
        status: 'ready',
        contribution: '25',
        yourTurn: 3,
        contractAddress: '0x45f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4',
        createdBlock: 18452120,
        nextDistribution: '2024-01-12T14:00:00Z',
        totalDistributed: '150 USDC',
        onChainVerified: true,
        transactionHash: getRandomTransactionHash(),
        creator: '0x893a...b4c5'
    },
    {
        id: 3,
        name: 'Comunidad La Paz #003',
        poolAmount: '40',
        participants: 2,
        maxParticipants: 6,
        currentRound: 0,
        totalRounds: 6,
        status: 'waiting',
        contribution: '10',
        yourTurn: 4,
        contractAddress: '0x12c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2',
        createdBlock: 18451985,
        nextDistribution: null,
        totalDistributed: '0 USDC',
        onChainVerified: true,
        transactionHash: getRandomTransactionHash(),
        creator: '0x156b...d7e8'
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