import { useState, useRef, useCallback } from 'react';

export const useNotification = () => {
  const [notification, setNotification] = useState({ msg: '', type: '', show: false });
  const notifTimer = useRef(null);

  const notify = useCallback((msg, type = 'success') => {
    clearTimeout(notifTimer.current);
    setNotification({ msg, type, show: true });
    notifTimer.current = setTimeout(() => {
      setNotification(n => ({ ...n, show: false }));
    }, 3000);
  }, []);

  return { notification, notify };
};
