import { useState, useEffect } from 'react';

function useLocalStorageItem(key: string) {
  const [item, setItem] = useState(() => {
    return JSON.parse(localStorage.getItem(key) || '[]');
  });

  useEffect(() => {
    const handleStorageChange = () => {
      setItem(JSON.parse(localStorage.getItem(key) || '[]'));
    };

    window.addEventListener('cartUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('cartUpdated', handleStorageChange);
    };
  }, [key]);

  return item;
}

export default useLocalStorageItem;
