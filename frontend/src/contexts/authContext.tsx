import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import api from '../services/api';
import { getProfile, loginUser, registerUser } from '@/apis/auth.api';
import type {
  AuthContextType,
  LoginInterface,
  RegisterInterface,
  User,
} from '@/interfaces/auth.interface';

const AuthContext = createContext<AuthContextType | undefined>(undefined);
interface AuthProviderProps {
  children: ReactNode;
}
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Attach token automatically
  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // loadUser();
    } else {
      setLoading(false);
    }
  }, []);

  // Load user
  const loadUser = async () => {
    try {
      const res = await getProfile();
      setUser(res.data);
    } catch (error) {
      logout();
    } finally {
      setLoading(false);
    }
  };

  // Login
  const login = async (data: LoginInterface) => {
    const res = await loginUser(data);
    console.log(res);
    
    const { accessToken,refreshToken } = res.data.tokens;

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;



    // await loadUser();
  };

  // Register
  const register = async (data: RegisterInterface) => {
    const res = await registerUser(data);
    return res.data;
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom Hook
export const useAuth = () => useContext(AuthContext);
