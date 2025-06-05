import { ChevronUp } from "lucide-react";
import React, { useEffect, useState } from "react";

export const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="cursor-pointer fixed bottom-6 right-6 z-50 p-2 rounded-full bg-blue-300 border border-blue-50/75 text-white shadow-md hover:bg-blue-400 transition-all"
      aria-label="Scroll to top"
    >
      <ChevronUp strokeWidth={3} size={24} />
    </button>
  );
};
