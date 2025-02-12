"use client";
import Logo from "@/components/Logo";
import {
  closeNav,
  selectNavIsOpen,
} from "@/lib/features/navigation/navigationSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Link from "next/link";
import MenuToggler from "./btns/menu-toggle-btn";

interface NavBarProps {
  className?: string;
}

const NavBar = ({ className }: NavBarProps) => {
  const dispatch = useAppDispatch();
  const navIsOpen = useAppSelector(selectNavIsOpen);

  // Navigation links data
  const links = [
    { href: "/about", text: "About me" },
    { href: "/portfolio", text: "Portfolio" },
    { href: "/blog", text: "Blog" },
    { href: "/contact", text: "Contact" },
  ];

  // Reusable Link component
  const NavLink = ({ href, text }: { href: string; text: string }) => (
    <Link
      href={href}
      onClick={() => dispatch(closeNav())}
      className="font-mono font-light text-lg hover:cursor-pointer relative group"
    >
      {text}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
    </Link>
  );

  return (
    <div
      className={`${className} mx-auto w-full text-amber-50 light:mix-blend-difference`}
    >
      {/* Desktop and Mobile Nav */}
      <nav className="grid grid-cols-2 md:grid-cols-3 justify-items-center items-center z-50 bg-transparent">
        {/* Left Links (Desktop) */}
        <div className="hidden md:flex gap-2 lg:gap-8">
          {links.slice(0, 2).map((link) => (
            <NavLink key={link.href} href={link.href} text={link.text} />
          ))}
        </div>

        {/* Logo */}
        <Logo className="justify-self-start md:justify-self-center " />

        {/* Right Links (Desktop) */}
        <div className="hidden md:flex gap-2 lg:gap-8">
          {links.slice(2).map((link) => (
            <NavLink key={link.href} href={link.href} text={link.text} />
          ))}
        </div>

        {/* Mobile Menu Toggler */}
        <div className="flex md:hidden justify-self-end gap-8">
          <MenuToggler isOpen={navIsOpen} />
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      <div
        className={`md:hidden min-h-screen w-screen fixed left-0 z-50 transition-all bg-blue-300 dark:bg-slate-900 text-black dark:text-white p-4 ${
          navIsOpen ? "animate-right-left" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col justify-start items-start gap-8">
          {links.map((link) => (
            <NavLink key={link.href} href={link.href} text={link.text} />
          ))}
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
