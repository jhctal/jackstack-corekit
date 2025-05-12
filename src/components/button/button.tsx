import { ButtonHTMLAttributes, PropsWithChildren, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  className?: string;
  type?: string;
};

/** Primary UI component for user interaction */
const Button = ({
  children,
  className,
  type = "button",
  ...props
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button type={type} className={className} {...props}>
      {children}
    </button>
  );
};

export default Button;
