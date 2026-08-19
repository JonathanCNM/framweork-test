import type { CSSProperties, ReactNode } from "react";

interface M2MConsentCheckboxProps {
  checked: boolean;
  accent: string;
  children: ReactNode;
}

export const M2MConsentCheckbox = ({
  checked,
  accent,
  children,
}: M2MConsentCheckboxProps) => (
  <label className="m2m-checkbox">
    <input type="checkbox" checked={checked} readOnly tabIndex={-1} />
    <span
      className="m2m-checkbox__box"
      style={
        { "--m2m-check-accent": accent } as CSSProperties & {
          [key: string]: string;
        }
      }
      aria-hidden
    />
    <span className="m2m-checkbox__copy">{children}</span>
  </label>
);
