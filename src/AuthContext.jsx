import React, { createContext, useState, useContext } from 'react'

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const initialUser = JSON.parse(localStorage.getItem('userData')) || null;
    const initialAuth = !!initialUser

    const [user, setUser] = useState(initialUser)
    const [isAuthenticated, setIsAuthenticated] = useState(initialAuth);

    const login = (userData) => {

        localStorage.setItem('userData', JSON.stringify(userData))

        setUser(userData)
        setIsAuthenticated(true)
    }

    const logout = () => {
        localStorage.removeItem('userData')
        
        setUser(null);
        setIsAuthenticated(false)
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}