import { InputHTMLAttributes } from "react";
import cn from "../../utils/cn";

type RadioInputProps = InputHTMLAttributes<HTMLInputElement> & {
  radioStyles?: string;
};

const Radio = ({ radioStyles, className, ...props }: RadioInputProps) => {
  return (
    <input
      type="radio"
      className={cn(
        "h-5 w-5 appearance-none rounded-full border border-gray-400 bg-white",
        "checked:border-4 checked:border-black",
        "hover:border-gray-600",
        "focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        radioStyles,
        className
      )}
      {...props}
    />
  );
};

export default Radio;
