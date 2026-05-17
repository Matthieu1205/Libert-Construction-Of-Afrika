import { createContext, useContext, useState, useCallback } from 'react';
import { DEFAULT_DATA } from '../data/defaultData';

const STORAGE_KEY = 'lca_data';

function loadData() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return { ...DEFAULT_DATA, ...parsed };
    }
  } catch {}
  return DEFAULT_DATA;
}

function saveData(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
}

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [data, setData] = useState(loadData);

  const update = useCallback((key, value) => {
    setData(prev => {
      const next = { ...prev, [key]: value };
      saveData(next);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setData(DEFAULT_DATA);
  }, []);

  return (
    <DataContext.Provider value={{ data, update, reset }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
