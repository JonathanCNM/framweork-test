import type { JSX } from "react";
import { useEffect, useRef } from "react";
import "../styles/popup.css";

export interface PopupProps {
  children: JSX.Element;
  visible?: boolean;
  onClose: () => void;
  className?: string;
  showCloseBtn?: boolean;
  footerColor?: string;
  CloseIcon?: React.ComponentType<{
    className?: string;
    onClick?: () => void;
    colors?: string[];
  }>;
}

/**
 * Popup Component
 * A modal/popup component with optional close button and click-outside-to-close functionality
 * 
 * @param visible - Controls popup visibility
 * @param onClose - Callback when popup should close
 * @param children - Content to display inside popup
 * @param className - Additional CSS classes
 * @param showCloseBtn - Whether to show the close button (default: true)
 * @param footerColor - Color for the close icon
 * @param CloseIcon - Optional custom close icon component
 */
export const Popup: React.FC<PopupProps> = ({
  visible,
  onClose,
  children,
  className = "",
  showCloseBtn = true,
  footerColor = "#000000",
  CloseIcon,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (!visible) return null;

  return (
    <>
      <span className="popup-blur" />
      <main
        ref={ref}
        role="alert"
        className={`popup-component ${className}`}
      >
        {showCloseBtn && CloseIcon && (
          <CloseIcon
            className="close-popup-icon close-icon"
            onClick={onClose}
            colors={[footerColor, footerColor]}
          />
        )}
        {children}
      </main>
    </>
  );
};
