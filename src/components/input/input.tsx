import { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  type?: string;
};

const Input = ({ className, type = "text", ...props }: InputProps) => {
  return <input className={className} type={type} {...props} />;
};

export default Input;
