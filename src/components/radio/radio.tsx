import React, { useState } from "react";
import cn from "../../utils/cn";

type RadioInputProps = {
  radioStyles?: string;
  value: string;
  name: string;
};

const Radio = ({ radioStyles, value, name }: RadioInputProps) => {
  const [hovered, setHovered] = useState(false);
  console.log("hovered", hovered);
  return (
    <>
      <div
        onMouseOver={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={cn(
          "h-12 w-12 rounded-full border",
          { "bg-black text-black": hovered, "bg-white": !hovered },
          radioStyles
        )}
      >
        {/* <div className="h-12 w-12 rounded-full bg-black " /> */}
      </div>
      <input type="radio" name={name} value={value} />
    </>
  );
};

export default Radio;
