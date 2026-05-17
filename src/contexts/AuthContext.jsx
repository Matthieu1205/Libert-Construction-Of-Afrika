import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

function getStoredPassword() {
  try {
    const stored = localStorage.getItem('lca_data');
    if (stored) {
      const data = JSON.parse(stored);
      return data?.settings?.admin_password || 'lca2024';
    }
  } catch {}
  return 'lca2024';
}

export function AuthProvider({ children }) {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('lca_admin') === '1');

  const login = (password) => {
    if (password === getStoredPassword()) {
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
