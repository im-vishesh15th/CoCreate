import React, { createContext, useState,useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
      
        return savedUser ? JSON.parse(savedUser) : null;
        
    });
  
    
    const register = async (userData) => {
        const response = await axios.post('https://cocreate-80yn.onrender.com/api/auth/register', userData,{withCredentials: false});
       
        setUser(response.data);
        localStorage.setItem('token', response.data.token);
    };

   
    const login = async (userData) => {
        try {
            console.log(userData);
            const response = await axios.post('https://cocreate-80yn.onrender.com/api/auth/login', userData,{withCredentials: false});
           
    
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
        localStorage.clear();
        
        
      
    };

    return (
        <AuthContext.Provider value={{ user, register, login ,logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const auth=useContext(AuthContext);
  
 
    return auth;
};
