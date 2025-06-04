import { TextareaHTMLAttributes } from "react";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  className?: string;
};

const Textarea = ({ className, ...props }: TextareaProps) => {
  return <textarea className={className} {...props} />;
};

export default Textarea;
