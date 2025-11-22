import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CreateGroup from './pages/CreateGroup';
import JoinGroup from './pages/JoinGroup';
import GroupDetails from './pages/GroupDetails';
import './index.css';

const App: React.FC = () => {
    return (
        <Router>
            <div className="min-h-screen">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/create-group" element={<CreateGroup />} />
                    <Route path="/join-group" element={<JoinGroup />} />
                    <Route path="/group/:groupId" element={<GroupDetails />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;