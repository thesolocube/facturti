import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc, onSnapshot, serverTimestamp, setDoc } from 'firebase/firestore';
import { INITIAL_DATA } from '../data/initialData';
import { auth, db } from '../firebase';

const AppContext = createContext();
const appDataRef = doc(db, 'appData', 'main');

export const AppProvider = ({ children }) => {
  const [data, setData] = useState(INITIAL_DATA);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [loadingData, setLoadingData] = useState(true);
  const [role, setRole] = useState('client');
  const [page, setPage] = useState('dashboard');

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setRole('client');
        setData(INITIAL_DATA);
        setPage('dashboard');
        setAuthLoading(false);
        return;
      }

      const userRef = doc(db, 'users', firebaseUser.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          email: firebaseUser.email || '',
          role: 'client',
          createdAt: serverTimestamp()
        });
        setRole('client');
      } else {
        const nextRole = userSnap.data()?.role === 'admin' ? 'admin' : 'client';
        setRole(nextRole);
      }

      setUser(firebaseUser);
      setAuthLoading(false);
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!user) {
      setLoadingData(false);
      return;
    }

    setLoadingData(true);
    const unsubscribeData = onSnapshot(appDataRef, async (snapshot) => {
      if (snapshot.exists()) {
        const remoteData = snapshot.data();
        setData(prev => ({
          ...prev,
          ...remoteData
        }));
      } else {
        await setDoc(appDataRef, {
          ...INITIAL_DATA,
          updatedAt: serverTimestamp()
        });
      }
      setLoadingData(false);
    });

    return () => unsubscribeData();
  }, [user]);

  const update = async (key, val) => {
    setData(d => ({ ...d, [key]: val }));
    await setDoc(
      appDataRef,
      {
        [key]: val,
        updatedAt: serverTimestamp()
      },
      { merge: true }
    );
  };

  const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const register = async (email, password) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, 'users', cred.user.uid), {
      email: cred.user.email || email,
      role: 'client',
      createdAt: serverTimestamp()
    });
  };

  const logout = async () => {
    await signOut(auth);
  };

  const value = useMemo(
    () => ({
      data,
      update,
      role,
      page,
      setPage,
      loadingData,
      user,
      authLoading,
      login,
      register,
      logout
    }),
    [data, role, page, loadingData, user, authLoading]
  );

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
