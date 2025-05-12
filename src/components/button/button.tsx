import { ButtonHTMLAttributes, PropsWithChildren, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  children: ReactNode;
  isLoading?: boolean;
};

/** Primary UI component for user interaction */
const Button = ({
  children,
  className,
  type,
  ...props
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button type={type || "button"} className={className} {...props}>
      {children}
    </button>
  );
};

export default Button;
