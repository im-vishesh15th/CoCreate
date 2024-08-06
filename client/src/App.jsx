import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './component/Dashboard';
import Editor from './component/Editor';
import Home from './pages/Home';
import Register from './pages/Register';
import { useIdleTimer } from 'react-idle-timer';

const App = () => {
    const handleOnIdle = () => {
        console.log('User is idle');

        // Actions to perform when the user is idle
        localStorage.clear();
        window.location.href = '/login';
    };

    useIdleTimer({
        timeout: 1000 * 60 * 90 , // 15 minutes
        onIdle: handleOnIdle,
        debounce: 500
    });

    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<HomeWrapper />} />
                    <Route path="/login" element={<LoginWrapper />} />
                    <Route path="/register" element={<RegisterWrapper />} />
                    <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
                    <Route path="/docs/:id" element={<PrivateRoute element={<Editor />} />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

const PrivateRoute = ({ element }) => {
    const { user } = useAuth();

    return user ? element : <Navigate to="/" replace />;
};

const LoginWrapper = () => {
    const { user } = useAuth();

    return user ? <Navigate to="/dashboard" replace /> : <Login />;
};

const HomeWrapper = () => {
    const { user } = useAuth();

    return user ? <Navigate to="/dashboard" replace /> : <Home />;
};

const RegisterWrapper = () => {
    const { user } = useAuth();

    return user ? <Navigate to="/dashboard" replace /> : <Register />;
};

export default App;
