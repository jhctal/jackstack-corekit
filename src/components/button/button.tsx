import { ButtonHTMLAttributes } from "react";
import { cva } from "class-variance-authority";
import cn from "../../utils/cn";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "warning"
  | "danger"
  | "success";

type ButtonSize = "sm" | "md" | "lg" | "xl";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  label: string;
  isLoading?: boolean;
};

type ButtonVariantsProps = {
  variant: ButtonVariant;
  size: ButtonSize;
  // could pass types for other things as variants like size, roundness, border
};

type ButtonVariantsFunction = (props: ButtonVariantsProps) => string;

/** Primary UI component for user interaction */
const Button = ({
  className,
  size = "md",
  variant = "primary",
  label,
  ...props
}: ButtonProps) => {
  const ButtonVariants: ButtonVariantsFunction = cva(
    "py-2.5 px-5 rounded cursor-pointer hover:shadow-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none",
    {
      variants: {
        variant: {
          primary:
            "bg-blue-600 hover:bg-blue-700 text-blue-100 hover:text-white",
          secondary:
            "bg-white text-black hover:bg-black hover:text-white border border-black",
          ghost: "bg-white text-black",
          warning:
            "bg-yellow-500 hover:bg-yellow-600 text-orange-100 hover:text-white",
          danger:
            "bg-red-500 hover:bg-red-600 text-orange-100 hover:text-white",
          success:
            "bg-green-600 hover:bg-green-700 text-teal-100 hover:text-white",
        },
        size: {
          sm: "text-sm",
          md: "text-md",
          lg: "text-lg",
          xl: "text-xl",
        },
      },

      // used if we won't pass any props for size and variant,
      defaultVariants: {
        variant: "primary",
        size: "md",
      },
    }
  );

  return (
    <button
      type="button"
      // className={`${ButtonVariants({ variant, size })} ${className}`}
      className={cn(ButtonVariants({ variant, size }), className)}
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;
