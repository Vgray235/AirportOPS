// import React, { createContext, useContext, useMemo, useState } from "react";
// // import * as api from "../services/api";
// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [auth, setAuth] = useState(() => {
//     const token = localStorage.getItem("token");
//     const role = localStorage.getItem("role");
//     const name = localStorage.getItem("name");
//     return token ? { token, role, name } : null;
//   });

//   const login = async (email, password) => {
//     const res = await api.login(email, password); // {token, role, name}
//     localStorage.setItem("token", res.token);
//     localStorage.setItem("role", res.role);
//     localStorage.setItem("name", res.name);
//     setAuth(res);
//   };

//   const register = async (payload) => {
//     await api.register(payload);
//   };

//   const logout = () => {
//     localStorage.clear();
//     setAuth(null);
//   };

//   const value = useMemo(() => ({ auth, login, logout, register }), [auth]);

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// export const useAuth = () => useContext(AuthContext);

// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const name = localStorage.getItem("name");
    if (token && role) setUser({ token, role, name });
  }, []);

  const login = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);
    localStorage.setItem("name", data.name);
    setUser(data);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
