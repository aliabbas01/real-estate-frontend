import { createContext, useContext, ReactNode , useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
  email: string;
  role: string;
}


interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>(null!);
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    try { 

      const response = await api.post('/auth/login', {
        email,
        password
      });
      
       if (response.data) { 
         setUser({
          id: response.data.user.userId,
          email: response.data.user.email,
          role: response.data.user.role || 'Buyer'  
        });
        
        setToken(response.data.data);
        localStorage.setItem('token', response.data.data);
        navigate('/');
      } else {
        throw new Error(response.data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };


  const register = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/register', {
        email,
        password
      });

      if (response.data) { 
        // Store the token in localStorage
        localStorage.setItem('token', response.data.data);
        
        // Set user data in context
        setUser({
          id: response.data.user.userId,
          email: response.data.user.email,
          role: response.data.user.role || 'Buyer'  
        });
        
        setToken(response.data.data);
        
        // Redirect to home page after successful registration
        navigate('/');
      } else {
        throw new Error('Registration failed - no token received');
      }
    } catch (error:any) {
      console.error('Registration error:', error);
      
      // Handle different error cases
      if (error.response) {
        // Server responded with an error status (4xx, 5xx)
        const errorMessage = error.response.data?.message || 'Registration failed';
        throw new Error(errorMessage);
      } else if (error.request) {
        // Request was made but no response received
        throw new Error('Network error - please try again');
      } else {
        // Something happened in setting up the request
        throw new Error('Registration request failed');
      }
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    navigate('/login');
  };
 
  const value = { user, token, login, register, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}


export function useAuth() { 
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}