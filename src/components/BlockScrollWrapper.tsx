import { useEffect } from "react";
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";

export interface BlockScrollWrapperProps {
  children: React.ReactNode;
}

export const BlockScrollWrapper: React.FC<BlockScrollWrapperProps> = ({
  children,
}) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    disableBodyScroll(document.body);

    return () => {
      document.body.style.overflow = "auto";
      enableBodyScroll(document.body);
      clearAllBodyScrollLocks();
    };
  }, []);

  return <>{children}</>;
};
