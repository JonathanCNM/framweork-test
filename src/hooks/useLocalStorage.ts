export const storageEventTarget = new EventTarget();

export const setLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
  storageEventTarget.dispatchEvent(new Event(key));
};

export const listenLocalStorage = (key: string, callback: () => void) => {
  const handler = () => callback();
  storageEventTarget.addEventListener(key, handler);
  return () => storageEventTarget.removeEventListener(key, handler);
};
