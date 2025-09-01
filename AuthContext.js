// AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");
        if (storedToken) {
          setToken(storedToken);
        }
      } catch (error) {
        console.error("Error loading token:", error);
      } finally {
        setLoading(false);
      }
    };

    loadToken();
  }, []);

  const saveToken = async (newToken) => {
    try {
      setToken(newToken);
      await AsyncStorage.setItem("token", newToken);
    } catch (error) {
      console.error("Error saving token:", error);
    }
  };

  const removeToken = async () => {
    try {
      setToken(null);
      await AsyncStorage.removeItem("token");
    } catch (error) {
      console.error("Error removing token:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ token, setToken: saveToken, removeToken, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
