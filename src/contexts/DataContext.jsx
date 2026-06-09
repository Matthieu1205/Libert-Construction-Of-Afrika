import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { DEFAULT_DATA } from '../data/defaultData';

const DOC_REF = doc(db, 'lca', 'data');

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [data, setData] = useState(DEFAULT_DATA);
  const [loading, setLoading] = useState(true);

  // Écoute les changements en temps réel depuis Firestore
  useEffect(() => {
    const unsub = onSnapshot(DOC_REF, (snap) => {
      if (snap.exists()) {
        setData({ ...DEFAULT_DATA, ...snap.data() });
      } else {
        // Premier lancement : on initialise Firestore avec les données par défaut
        setDoc(DOC_REF, DEFAULT_DATA);
      }
      setLoading(false);
    }, () => {
      // En cas d'erreur réseau, on utilise les données par défaut
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const update = useCallback(async (key, value) => {
    const next = { [key]: value };
    setData(prev => ({ ...prev, ...next }));
    await setDoc(DOC_REF, next, { merge: true });
  }, []);

  const reset = useCallback(async () => {
    setData(DEFAULT_DATA);
    await setDoc(DOC_REF, DEFAULT_DATA);
  }, []);

  return (
    <DataContext.Provider value={{ data, update, reset, loading }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
