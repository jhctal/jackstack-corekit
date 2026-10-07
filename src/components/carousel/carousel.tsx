import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import cn from "../../utils/cn";

type CarouselItem = {
  alt: string;
  image: string;
  link: string;
  caption: string;
  type: "internal" | "external";
};

type CarouselProps = {
  items: CarouselItem[];
  className?: string;
  imgClasses?: string;
};

const Carousel = ({ className, items, imgClasses }: CarouselProps) => {
  const [index, setIndex] = useState(0);
  const buttonStyles = "bg-blue-400 rounded-lg p-2";
  console.log(index);
  console.log(items.length);
  console.log(index === items.length);
  const handleLeft = () => {
    if (index === 0) return;
    setIndex((prev) => prev - 1);
  };

  const handleRight = () => {
    if (index === items.length - 1) return;
    setIndex((prev) => prev + 1);
  };

  return (
    <div className={cn("h-screen w-screen border", className)}>
      <img
        src={items[index].image}
        className={cn("h-full w-full", imgClasses)}
        alt={items[index].alt}
      />
      <div className="absolute flex justify-between">
        <button className={buttonStyles} onClick={handleLeft}>
          <ChevronLeft />
        </button>
        <button className={buttonStyles} onClick={handleRight}>
          <ChevronRight />
        </button>
      </div>
      <p className="text-black text-sm">{items[index].caption}</p>
    </div>
  );
};

export default Carousel;
