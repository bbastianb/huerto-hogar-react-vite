import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import {
  getUsuarioActual,
  setUsuarioActual,
  getUsuarios,
} from "../utils/Usuarios";
import { loginUsuario } from "../services/UsuarioService";
import "../utils/UserContext.logic.js";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null); // token JWT
  const [isLoading, setIsLoading] = useState(true);

  // Cargar usuario + token al iniciar
  useEffect(() => {
    const usuario = window.UserContextLogic.loadInitialUser(getUsuarioActual);
    if (usuario) setUser(usuario);

    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(storedToken);

    setIsLoading(false);
  }, []);

  // Cada vez que cambie el token, configurar axios para mandar el JWT
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  // LOGIN: llama al backend, guarda token + usuario
  // userData = { email, contrasenna }
  const login = async (userData) => {
    const { email, contrasenna } = userData;

    // 1) Llamar al backend → { token, usuario }
    const { token: newToken, usuario } = await loginUsuario(email, contrasenna);

    // 2) Guardar usuario usando tu lógica antigua
    const res = window.UserContextLogic.loginUser(usuario, setUsuarioActual);
    setUser(res.user);

    // 3) Guardar token en estado + localStorage
    setToken(newToken);
    localStorage.setItem("token", newToken);

    // 4) Configurar axios
    axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;

    // 5) Devolver usuario para redirigir según rol
    return res.user;
  };

  // LOGOUT: limpiar usuario + token
  const logout = () => {
    setUser(null);
    setToken(null);

    window.UserContextLogic.logoutUser(localStorage);
    localStorage.removeItem("token");

    delete axios.defaults.headers.common["Authorization"];
  };

  // Update user delegando en lógica externa (lo que ya tenías)
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

  useEffect(() => {
    const syncUser = (e) => {
      if (e && e.key && e.key !== "usuarioActual") return;

      const u = window.UserContextLogic.getSyncUser(getUsuarioActual);
      setUser(u || null);

      const storedToken = localStorage.getItem("token");
      setToken(storedToken || null);
    };

    const cleanup = window.UserContextLogic.addUserSyncListeners(
      syncUser,
      window
    );
    return () => {
      cleanup();
    };
  }, []);

  const isAuthenticated = !!user && !!token;
  const isAdmin = user?.rol === "admin";
  const isUsuario = user?.rol === "usuario";

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        updateUser,
        isLoading,
        isAuthenticated,
        isAdmin,
        isUsuario,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
