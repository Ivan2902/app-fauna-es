import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Estado del usuario; `null` significa que está desconectado

  const login = (userData) => {
    setUser(userData); // Actualiza el usuario al iniciar sesión
  };

  const logout = () => {
    setUser(null); // Elimina el usuario al cerrar sesión
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
