// src/UserContext/UserContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { getUsuarioActual, setUsuarioActual } from "../utils/Usuarios";
import "../utils/UserContext.logic.js";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const usuario = window.UserContextLogic.loadInitialUser(getUsuarioActual);
    if (usuario) setUser(usuario);
    setIsLoading(false);
  }, []);

  // Login delegando en lógica externa
  const login = (userData) => {
    const res = window.UserContextLogic.loginUser(userData, setUsuarioActual);
    setUser(res.user);
  };

  // Logout delegando en lógica externa
  const logout = () => {
    setUser(null);
    window.UserContextLogic.logoutUser(localStorage);
  };

  // Update user delegando en lógica externa
  const updateUser = (updatedData) => {
    const newUser = window.UserContextLogic.buildUpdatedUser(user, updatedData);
    setUser(newUser);
    setUsuarioActual(newUser);

    const usuarios = getUsuarios();
    const updatedUsuarios = window.UserContextLogic.updateUserList(
      usuarios,
      newUser
    );
    window.UserContextLogic.persistUsuarios(updatedUsuarios, localStorage);
  };

  // Sincronización entre pestañas y dentro del mismo tab usando helpers testeables
  useEffect(() => {
    const syncUser = (e) => {
      // Si viene de 'storage', solo reaccionar a la clave correcta
      if (e && e.key && e.key !== "usuarioActual") return;
      const u = window.UserContextLogic.getSyncUser(getUsuarioActual);
      setUser(u || null);
    };

    const cleanup = window.UserContextLogic.addUserSyncListeners(
      syncUser,
      window
    );
    return () => {
      cleanup();
    };
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
        updateUser,
        isLoading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
