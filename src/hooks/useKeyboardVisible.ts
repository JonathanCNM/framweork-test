import { useEffect, useState } from "react";

export const useKeyboardVisible = () => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(
    window.visualViewport?.height || window.innerHeight
  );

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
      if (!isMobile) document.body.style.overflow = "hidden";
      setIsKeyboardOpen(true);
    };

    const handleBlur = () => {
      if (!isMobile) document.body.style.overflow = "";
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

  return { isKeyboardOpen, viewportHeight };
};
