import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CreateGroup from './pages/CreateGroup';
import './index.css';

const App: React.FC = () => {
    return (
        <Router>
            <div className="min-h-screen">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/create-group" element={<CreateGroup />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;