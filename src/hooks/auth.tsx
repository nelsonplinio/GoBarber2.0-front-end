import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
} from 'react';
import api from '../services/api';

interface User {
  id: string;
  avatar_url: string;
  name: string;
  email: string;
}
interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signOut(): void;
  updateUser(user: Partial<User>): void;
  signIn(credentials: SignInCredentials): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return {
        token,
        user: JSON.parse(user),
      };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/sessions', { email, password });

    const { token, user } = response.data;

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    (userUpdate: Partial<User>) => {
      setData({
        token: data.token,
        user: {
          ...data.user,
          ...userUpdate,
        },
      });
    },
    [data, setData],
  );

  useEffect(() => {
    localStorage.setItem('@GoBarber:token', data.token);
    localStorage.setItem('@GoBarber:user', JSON.stringify(data.user));
  }, [data]);

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
