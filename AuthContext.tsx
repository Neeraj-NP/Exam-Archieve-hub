import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User } from './types';

// Mock user database, used as a default if none exists in storage
const MOCK_USERS: { [email: string]: { id: number, password_hash: string, role: 'student' | 'admin' } } = {
    'admin@examhub.com': { id: 1, password_hash: 'admin123', role: 'admin' },
    'student@examhub.com': { id: 2, password_hash: 'student123', role: 'student' },
};

const USERS_STORAGE_KEY = 'exam-hub-users';
const CURRENT_USER_STORAGE_KEY = 'exam-hub-currentUser';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<User>;
  register: (email: string, pass: string) => Promise<User>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize and load users from localStorage
  useEffect(() => {
    try {
      // Initialize user database if it doesn't exist
      const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
      if (!storedUsers) {
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(MOCK_USERS));
      }

      // Load the currently logged-in user
      const storedCurrentUser = localStorage.getItem(CURRENT_USER_STORAGE_KEY);
      if (storedCurrentUser) {
        setCurrentUser(JSON.parse(storedCurrentUser));
      }
    } catch (error) {
      console.error("Failed to initialize or parse from localStorage", error);
      localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
      localStorage.removeItem(USERS_STORAGE_KEY);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (email: string, pass: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '{}');
        const userRecord = users[email];

        if (userRecord && userRecord.password_hash === pass) {
          const user: User = { id: userRecord.id, email, role: userRecord.role };
          setCurrentUser(user);
          localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(user));
          resolve(user);
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 500);
    });
  };

  const register = (email: string, pass: string): Promise<User> => {
      return new Promise((resolve, reject) => {
          setTimeout(() => {
              const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '{}');
              
              if (users[email]) {
                  return reject(new Error('User with this email already exists'));
              }

              const newUserRecord = { id: Date.now(), password_hash: pass, role: 'student' as const };
              users[email] = newUserRecord;
              localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
              
              const user: User = { id: newUserRecord.id, email, role: 'student' };
              setCurrentUser(user);
              localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(user));
              resolve(user);
          }, 500);
      });
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ currentUser, loading, login, register, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};