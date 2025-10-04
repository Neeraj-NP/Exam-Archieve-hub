import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User } from './types';

// Mock user database
const MOCK_USERS: { [email: string]: { id: number, password_hash: string, role: 'student' | 'admin' } } = {
    'admin@examhub.com': { id: 1, password_hash: 'admin123', role: 'admin' },
    'student@examhub.com': { id: 2, password_hash: 'student123', role: 'student' },
};

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

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('currentUser');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (email: string, pass: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const userRecord = MOCK_USERS[email];
        if (userRecord && userRecord.password_hash === pass) {
          const user: User = { id: userRecord.id, email, role: userRecord.role };
          setCurrentUser(user);
          localStorage.setItem('currentUser', JSON.stringify(user));
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
              if (MOCK_USERS[email]) {
                  return reject(new Error('User already exists'));
              }
              const newUserRecord = { id: Date.now(), password_hash: pass, role: 'student' as const };
              MOCK_USERS[email] = newUserRecord;
              const user: User = { id: newUserRecord.id, email, role: 'student' };
              setCurrentUser(user);
              localStorage.setItem('currentUser', JSON.stringify(user));
              resolve(user);
          }, 500);
      });
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ currentUser, loading, login, register, logout }}>
      {children}
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
