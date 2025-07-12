import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    // Update the API URLs to your production URLs
    const apiBaseURL = 'https://cocreate-o3gz.onrender.com/api/auth';

    const register = async (userData) => {
        try {
            const response = await axios.post(`${apiBaseURL}/register`, userData, { withCredentials: true });
            setUser(response.data.user);
            localStorage.setItem('token', response.data.token);
        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    const login = async (userData) => {
        try {
            const response = await axios.post(`${apiBaseURL}/login`, userData, { withCredentials: true });
            const user = response.data.user;
            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('token', response.data.token);
                setUser(user);
            } else {
                console.error('No user in response data');
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const auth = useContext(AuthContext);
    if (auth === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return auth;
};
