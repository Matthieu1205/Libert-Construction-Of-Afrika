import { createContext, useContext, useState } from 'react';
import { useData } from './DataContext';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { data } = useData();
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('lca_admin') === '1');

  const login = (password) => {
    const adminPassword = data?.settings?.admin_password || 'lca2024';
    if (password === adminPassword) {
      sessionStorage.setItem('lca_admin', '1');
      setAuthed(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem('lca_admin');
    setAuthed(false);
  };

  return (
    <AuthContext.Provider value={{ authed, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
