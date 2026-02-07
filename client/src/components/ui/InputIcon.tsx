import type { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: ReactNode;
}

export default function InputIcon({ icon, ...inputProps }: InputProps) {
  return (
    <div className="input-icon relative center-y">
      {icon}
      <input className="auth-input pl-12" {...inputProps} />
    </div>
  );
}
