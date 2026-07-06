import { useEffect, useState, type CSSProperties } from "react";
import "../styles/toast.css";

export interface ToastProps {
  visible: boolean;
  message: string;
  title?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  duration?: number;
  type?: "success" | "error" | "info";
  onClose?: () => void;
  showIcon?: boolean;
  className?: string;
  style?: CSSProperties;
}

/**
 * Toast Component
 * A notification toast that appears at the bottom of the screen
 *
 * @param visible - Controls toast visibility
 * @param message - Main message to display
 * @param title - Optional title
 * @param buttonText - Optional action button text
 * @param onButtonClick - Callback for action button
 * @param duration - Duration in milliseconds before auto-dismiss (default: 2000)
 * @param type - Toast type: success, error, or info (default: "success")
 * @param onClose - Callback when toast closes
 * @param showIcon - Whether to show the icon (default: true)
 * @param className - Custom classNames of the container
 * @param style - Custom style of the container
 */
export const Toast = ({
  visible = false,
  message,
  title,
  buttonText,
  onButtonClick,
  duration = 2000,
  type = "success",
  showIcon = true,
  onClose = () => {},
  className = "",
  style = {},
}: ToastProps) => {
  const [isVisible, setIsVisible] = useState(visible);

  useEffect(() => {
    if (!visible) return;

    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [visible, duration, onClose]);

  if (!isVisible) return null;

  const cn = ["toast", `toast-${type}`, className].filter(Boolean).join(" ");

  return (
    <div className={cn} style={style}>
      {showIcon && (
        <>
          {type === "success" && <span className="toast-icon">✓</span>}
          {type === "error" && <span className="toast-icon">✕</span>}
          {type === "info" && <span className="toast-icon">ℹ</span>}
        </>
      )}

      <div className="toast-content">
        {title && <div className="toast-title">{title}</div>}
        <div className="toast-message">{message}</div>
      </div>

      {buttonText && (
        <button
          type="button"
          className="toast-action-button"
          onClick={() => onButtonClick?.()}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};
