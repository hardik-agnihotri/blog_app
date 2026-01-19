import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { getUser, goGhost } from "../api/userApi";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [Ghost, setGhost] = useState(false);
  const token = localStorage.getItem("Token");

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("Token");
      // console.log(token);
      if (!token) {
        setLoading(false);
        return;
      }
      const data = await getUser();
      console.log(data);
      setUser(data.user);
    } catch (error) {
      // setError("Failed to load User");
      console.error("Auth error:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    console.log("auth context loaded once")
    fetchUser();
  }, []);

  const login=()=>{
    fetchUser()
  }


  const enableGhostMode = async () => {
    try {
      const data = await goGhost();
      setUser(data.user); // 🔥 THIS updates UI instantly
    } catch (error) {
      console.error("Ghost mode error", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("Token");
    setUser(null);
  };

  return (
    <AuthContext.Provider  value={{ user, loading, login, logout, enableGhostMode }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);