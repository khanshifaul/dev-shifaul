"use client";
import { FaArrowDown } from "react-icons/fa6";
import { Button } from "../ui/button";

interface ScrollSnapButtonProps {
  className?: string;
}

export default function ScrollSnapButton({ className }: ScrollSnapButtonProps) {
  const scrollToNextSnap = () => {
    // Try to select the scroll container by its ID.
    const container = document.getElementById("scroll-container");
    if (container) {
      container.scrollBy({
        top: container.clientHeight,
        behavior: "smooth",
      });
    } else {
      // fallback to scrolling the window
      window.scrollBy({
        top: window.innerHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={`${className}`}>
      <Button
        onClick={scrollToNextSnap}
        className="mt-8 p-3 bg-amber-400 hover:bg-amber-500 rounded-full transition-colors cursor-pointer"
        aria-label="Scroll to next section"
      >
        <FaArrowDown size={24} className="text-gray-900" />
      </Button>
    </div>
  );
}
