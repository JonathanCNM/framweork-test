import { useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

export const useKeyboardVisible = () => {
  const isKeyboardOpenKey = "isKeyboardOpen";
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(
    window.visualViewport?.height || window.innerHeight
  );
  const { listenLocalStorage, setLocalStorage } = useLocalStorage();

  useEffect(() => {
    const handleResize = () =>
      setViewportHeight(window.visualViewport?.height || window.innerHeight);
    window.visualViewport?.addEventListener("resize", handleResize);
    window.addEventListener("resize", handleResize);

    return () => {
      window.visualViewport?.removeEventListener("resize", handleResize);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    const handleFocus = () => {
      if (isMobile) document.body.style.overflow = "hidden";
      setLocalStorage(isKeyboardOpenKey, JSON.stringify(true));
      setIsKeyboardOpen(true);
    };

    const handleBlur = () => {
      if (isMobile) document.body.style.overflow = "";
      setLocalStorage(isKeyboardOpenKey, JSON.stringify(false));
      setIsKeyboardOpen(false);
    };

    window.addEventListener("focusin", handleFocus);
    window.addEventListener("focusout", handleBlur);

    return () => {
      window.removeEventListener("focusin", handleFocus);
      window.removeEventListener("focusout", handleBlur);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const unlisten = listenLocalStorage(isKeyboardOpenKey, () =>
      setIsKeyboardOpen(localStorage.getItem(isKeyboardOpenKey) === "true")
    );
    return unlisten;
  }, []);

  const handlerSetIsKeyboardOpen = (isOpen: boolean) => {
    setLocalStorage(isKeyboardOpenKey, JSON.stringify(isOpen));
    setIsKeyboardOpen(isOpen);
  };

  return { isKeyboardOpen, viewportHeight, handlerSetIsKeyboardOpen };
};
