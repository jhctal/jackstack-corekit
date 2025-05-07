import React from "react";

export interface ButtonProps {
  /** Is this the principal call to action on the page? */
  primary?: boolean;
  /** What background color to use */
  backgroundColor?: string;
  /** How large should the button be? */
  size?: "small" | "medium" | "large";
  /** Button contents */
  label: string;
  /** Optional click handler */
  onClick?: () => void;
}

/** Primary UI component for user interaction */
export const Button = ({
  primary = false,
  size = "medium",
  backgroundColor,
  label,
  ...props
}: ButtonProps) => {
  return (
    <button
      type="button"
      // className={['storybook-button', `storybook-button--${size}`, mode].join(' ')}
      className="bg-green-600 rounded-xl cursor-pointer inline-block font-bold leading-0.5 text-white hover:shadow-md py-2.5 px-4 text-md"
      style={{ backgroundColor }}
      {...props}
    >
      {label}
    </button>
  );
};
