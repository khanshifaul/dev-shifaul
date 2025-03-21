"use client";
import { SidebarToggler } from "@/components/btns/sidebar-toggle-btn";
import { ThemeBtn } from "@/components/btns/theme-btn";
import UserBox from "@/components/userBox";

const AdminHeader = () => {
  return (
    <div className="sticky w-full top-0 z-50 bg-background p-2">
      <div className="md:container mx-auto">
        <div className="flex justify-between items-center min-md:mx-12">
          <div className="flex justify-between items-center">
            <div className="md:hidden block">
              <SidebarToggler />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <UserBox />
            <ThemeBtn />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
