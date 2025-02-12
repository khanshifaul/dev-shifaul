"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaShareAlt,
  FaTimes,
  FaWhatsapp,
} from "react-icons/fa";
import { ThemeBtn } from "./btns/theme-btn";

const FloatingWidget = () => {
  const [isVisible, setIsVisible] = useState(true);
  const pathname = usePathname();

  const handleCopy = () => {
    navigator.clipboard.writeText(pathname);
    alert("Link copied to clipboard!");
  };

  const shareLink = () => {
    if (navigator.share) {
      navigator.share({
        title: "Check this out!",
        url: pathname,
      });
    } else {
      handleCopy();
    }
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      {isVisible && (
        <motion.div
          animate={{ x: [100, 0], opacity: [0, 1] }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 10,
            ease: "easeInOut",
          }}
          className="fixed bottom-12 left-1/2 right-auto transform -translate-x-1/2 md:right-4 md:left-auto z-50 h-auto flex flex-col justify-center items-center gap-3 bg-transparent pointer-events-none"
        >
          <div className="p-2 flex flex-row md:flex-col justify-center items-center gap-3 bg-gray-500 dark:bg-gray-900 rounded-full pointer-events-auto">
            <ThemeBtn />
            <Button
              onClick={shareLink}
              className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full hover:bg-gray-600 transition aspect-square cursor-pointer"
            >
              <FaShareAlt className="dark:text-white text-black" size={20} />
            </Button>
            <Link
              href="https://github.com/khanshifaul"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full hover:bg-gray-600 transition aspect-square cursor-pointer"
            >
              <FaGithub className="dark:text-white text-black" size={20} />
            </Link>
            <Link
              href="https://linkedin.com/in/khan-shifaul"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full hover:bg-gray-600 transition aspect-square cursor-pointer"
            >
              <FaLinkedin className="dark:text-white text-black" size={20} />
            </Link>
            <Link
              href={`https://wa.me/+8801701005355?text=Hi, I saw your portfolio and I'm interested in working with you!`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full hover:bg-gray-600 transition aspect-square cursor-pointer"
            >
              <FaWhatsapp className="dark:text-white text-black" size={20} />
            </Link>
            <Button
              onClick={toggleVisibility}
              className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full hover:bg-gray-600 transition aspect-square cursor-pointer"
            >
              <FaTimes className="text-red-600" size={20} />
            </Button>
          </div>
        </motion.div>
      )}
      {!isVisible && (
        <motion.div
          animate={{ x: [100, 0], opacity: [0, 1] }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 10,
            ease: "easeInOut",
          }}
          className="fixed bottom-12 right-4 aspect-square z-50 h-auto flex flex-col justify-center items-center gap-3 bg-transparent pointer-events-none"
        >
          <div className="p-2 flex flex-row md:flex-col justify-center items-center gap-3 bg-gray-500 dark:bg-gray-900 rounded-full pointer-events-auto z-50">
            <Button
              onClick={toggleVisibility}
              className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full hover:bg-gray-600 transition aspect-square cursor-pointer"
            >
              <FaShareAlt className="dark:text-white text-black" size={20} />
            </Button>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default FloatingWidget;
