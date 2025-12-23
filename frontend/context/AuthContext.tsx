import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, User as FirebaseUser, signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import axios from 'axios';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null; // backend user
  firebaseUser: FirebaseUser | null;
  token: string | null; // backend JWT
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  fetchBackendUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Backend base URL: set VITE_BACKEND_API_URL in frontend .env; falls back to relative /api
const API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL || '/api';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [token, setToken] = useState<string | null>(null); // backend JWT
  const [loading, setLoading] = useState(true);

  // Called after Firebase login to sync/create user in backend and get backend JWT
  const syncWithBackend = async (idToken: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        idToken,
      });

      const { user: backendUser, token: backendToken } = response.data;

      setUser(backendUser);
      setToken(backendToken);
      localStorage.setItem('authToken', backendToken);
    } catch (error) {
      console.error('Failed to sync auth with backend:', error);
      setUser(null);
      setToken(null);
      localStorage.removeItem('authToken');
    }
  };

  const fetchBackendUser = async () => {
    if (!token) return;

    try {
      const response = await axios.get(`${API_BASE_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.error('Failed to fetch backend user:', error);
      setUser(null);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (userCredential) => {
      setFirebaseUser(userCredential);

      if (userCredential) {
        try {
          const idToken = await userCredential.getIdToken();
          await syncWithBackend(idToken);
        } catch (error) {
          console.error('Failed to get Firebase ID token:', error);
          setUser(null);
          setToken(null);
          localStorage.removeItem('authToken');
        }
      } else {
        setUser(null);
        setToken(null);
        localStorage.removeItem('authToken');
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      // onAuthStateChanged will handle backend sync
    } catch (error) {
      console.error('Firebase Google login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
      setToken(null);
      localStorage.removeItem('authToken');
    } catch (error) {
      console.error('Firebase logout failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, firebaseUser, token, loading, loginWithGoogle, logout, fetchBackendUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
