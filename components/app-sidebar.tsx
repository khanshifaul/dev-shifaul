"use client";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";

import { useRouter } from "next/navigation";
import {
  LuFileText,
  LuMessageSquare,
  LuSettings,
  LuUser,
  LuUsers,
} from "react-icons/lu";
import { PiProjectorScreenChart } from "react-icons/pi";
import { RiHome2Line } from "react-icons/ri";
interface AppSidebarProps {
  role: "admin" | "user";
}

export const adminNavData = [
  { name: "Dashboard", path: "/admin", icon: RiHome2Line },
  { name: "Messages", path: "/admin/messages", icon: LuMessageSquare },
  { name: "Users", path: "/admin/users", icon: LuUser },
  {
    name: "Portfolio Projects",
    path: "/admin/projects",
    icon: PiProjectorScreenChart,
  },
  { name: "Blog Posts", path: "/admin/blog-posts", icon: LuFileText },
  { name: "Subscribers", path: "/admin/subscribers", icon: LuUsers },
  { name: "Settings", path: "/admin/settings", icon: LuSettings },
];

export const userNavData = [
  { name: "My Account", path: "/user", icon: LuUser },
  { name: "Change Password", path: "/user/password-change", icon: LuUser },
];
export const AppSidebar: React.FC<AppSidebarProps> = ({ role }) => {
  const router = useRouter();
  const navData = role === "admin" ? adminNavData : userNavData;

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="flex flex-col gap-2">
          {navData.map((link, index) => {
            const Icon = link.icon;
            return (
              <Button
                variant={"outline"}
                onClick={() => {
                  router.push(link.path);
                }}
                key={index}
                className="w-full text-left flex justify-start items-center gap-2 cursor-pointer"
              >
                <Icon className="h-5 w-5" />
                {link.name}
              </Button>
            );
          })}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <p className="text-center">
          <span className="font-[AmadeusAP]">
            {" "}
            {new Date().getFullYear()} &copy;{" "}
          </span>
          Shifaul Islam
        </p>
      </SidebarFooter>
    </Sidebar>
  );
};
