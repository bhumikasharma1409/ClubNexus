import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {

    if (token) {
      try {

        const payload = JSON.parse(atob(token.split(".")[1]));

        if (payload.exp * 1000 > Date.now()) {

          const savedUser = JSON.parse(localStorage.getItem("user"));
          if(savedUser) {
            setUser(savedUser);
          }
        } else {
          logout(); 
        }
      } catch (e) {
        console.error("Invalid token:", e);
        logout();
      }
    }
  }, [token]);

  const login = (userData, userToken) => {
    localStorage.setItem("token", userToken);
    localStorage.setItem("user", JSON.stringify(userData));
    setToken(userToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};