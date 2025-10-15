export const useLocalStorage = () => {
  const storageEventTarget = new EventTarget();
  const setLocalStorage = (key: string, value: string) => {
    localStorage.setItem(key, value);
    storageEventTarget.dispatchEvent(new Event(key));
  };

  const listenLocalStorage = (key: string, callback: () => void) => {
    const handler = () => callback();
    storageEventTarget.addEventListener(key, handler);
    return () => storageEventTarget.removeEventListener(key, handler);
  };

  return {
    setLocalStorage,
    listenLocalStorage,
  };
};
