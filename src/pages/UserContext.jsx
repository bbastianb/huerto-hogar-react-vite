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
    // 🔄 Mantener el contexto sincronizado con localStorage
useEffect(() => {
    const syncUser = () => {
      const u = getUsuarioActual();
      setUser(u || null);
    };
  
    // Mismo tab (nuestro evento) y entre pestañas (evento nativo de storage)
    window.addEventListener("usuarioActual:changed", syncUser);
    const onStorage = (e) => { if (e.key === "usuarioActual") syncUser(); };
    window.addEventListener("storage", onStorage);
  
    return () => {
      window.removeEventListener("usuarioActual:changed", syncUser);
      window.removeEventListener("storage", onStorage);
    };
  }, []);
  

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