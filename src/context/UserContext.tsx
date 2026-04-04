import { createContext, useContext, useState, useEffect } from 'react';
import { getMe, logout } from '../utils/user-api.ts';

export type User = {
  user_email: string;
  user_name: string;
  is_admin: boolean;
};

export type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  admin: boolean;
  setAdmin: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  logoutUser: () => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

type UserProviderProps = {
  children: React.ReactNode;
};

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initAuth() {
      try {
        const data = await getMe();
        if (data) {
          setUser(data);
          setAdmin(data.is_admin === true);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    initAuth();
  }, []);

  const logoutUser = async () => {
    try {
      await logout();
    } catch {
      console.error('Logout failed on server, clearing local state anyway');
    } finally {
      setUser(null);
      setAdmin(false);
    }
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, admin, setAdmin, loading, logoutUser }}
    >
      {children}
    </UserContext.Provider>
  );
}
/* eslint-disable react-refresh/only-export-components */
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
