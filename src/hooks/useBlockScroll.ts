import { useEffect } from "react";
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";

export const useBlockScroll = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    disableBodyScroll(document.body, { reserveScrollBarGap: false });

    return () => {
      document.body.style.overflow = "";
      enableBodyScroll(document.body);
      clearAllBodyScrollLocks();
    };
  }, []);
};
