import { useId, type CSSProperties } from "react";

export interface InputRadioProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  backgroundColor?: string;
  label: string;
  id?: string;
}

export const InputRadio: React.FC<InputRadioProps> = ({
  backgroundColor,
  label,
  id,
  ...props
}) => {
  const useid = useId();
  const finalId = id ?? useid;
  return (
    <section
      className="form-control"
      style={
        {
          "--backgroundColor": backgroundColor,
          marginTop: 6,
        } as CSSProperties
      }
    >
      <label className="container">
        <input
          {...props}
          type="radio"
          id={finalId}
        />
        <span className="checkmark"></span>
        <label htmlFor={finalId}>{label}</label>
      </label>
    </section>
  );
};
