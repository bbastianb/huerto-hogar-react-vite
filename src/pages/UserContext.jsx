// src/UserContext/UserContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUsuarioActual, setUsuarioActual, getUsuarios } from '../utils/Usuarios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Cargar usuario desde tu sistema actual
    useEffect(() => {
        const usuario = getUsuarioActual();
        if (usuario) {
            setUser(usuario);
        }
        setIsLoading(false);
    }, []);

    const login = (userData) => {
        setUser(userData);
        setUsuarioActual(userData);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('usuarioActual');
    };

    const updateUser = (updatedData) => {
        const newUser = { ...user, ...updatedData };
        setUser(newUser);
        setUsuarioActual(newUser);
        
        // Actualizar también en la lista de usuarios
        const usuarios = getUsuarios();
        const updatedUsuarios = usuarios.map(u => 
            u.id === newUser.id ? newUser : u
        );
        localStorage.setItem('usuarios', JSON.stringify(updatedUsuarios));
    };

    return (
        <UserContext.Provider value={{
            user,
            login,
            logout,
            updateUser,
            isLoading,
            isAuthenticated: !!user
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);