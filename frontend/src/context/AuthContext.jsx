import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    // Try to load user from token
    if (token) {
      try {
        // You would normally verify the token with the backend here
        // For simplicity, we'll decode it (this is insecure, but ok for this)
        const payload = JSON.parse(atob(token.split(".")[1]));
        // Check if token is expired
        if (payload.exp * 1000 > Date.now()) {
          // In a real app, you'd fetch user data from /api/auth/me
          // For now, let's just restore the user info from localStorage
          const savedUser = JSON.parse(localStorage.getItem("user"));
          if(savedUser) {
            setUser(savedUser);
          }
        } else {
          logout(); // Token expired
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