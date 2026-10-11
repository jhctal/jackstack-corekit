import { InputHTMLAttributes } from "react";
import cn from "../../utils/cn";

type CheckboxProps = InputHTMLAttributes<HTMLInputElement>;

const Checkbox = ({ className, ...props }: CheckboxProps) => {
  return (
    <input
      type="checkbox"
      className={cn(
        "h-5 w-5 accent-black cursor-pointer",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
};

export default Checkbox;
