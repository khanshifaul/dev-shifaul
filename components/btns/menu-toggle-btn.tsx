"use client";
import { Button } from "@/components/ui/button";
import { closeNav, openNav } from "@/lib/features/navigation/navigationSlice";
import { useAppDispatch } from "@/lib/hooks";
import { FaBars, FaXmark } from "react-icons/fa6";
interface MenuTogglerProps {
  isOpen: boolean;
}

const MenuToggler = ({ isOpen }: MenuTogglerProps) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(isOpen ? closeNav() : openNav());
  };

  return (
    <Button variant="none" onClick={handleClick} className="cursor-pointer">
      {isOpen ? (
        <FaXmark className="text-5xl" />
      ) : (
        <FaBars className="text-5xl" />
      )}
    </Button>
  );
};

export default MenuToggler;
