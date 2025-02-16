'use client'

import { createContext, useContext, useState } from "react";
import {login, signup} from '../api/Auth'

const AuthContext = createContext();

export const AuthProvider = ({children}) => {

  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const logIn = async (user) => {
    try {
      await login(user);
      setUser(user);
      setIsAuthenticated(true);
    } catch (err) {
      throw new Error(err)
    }
  }

  const signUp = async (user) => {
    try {
      await signup(user);
      setUser(user);
      setIsAuthenticated(true);
    } catch (err) {
      throw new Error(err)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        logIn,
        signUp,
        user,
        isAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if(!context){
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context;
};
