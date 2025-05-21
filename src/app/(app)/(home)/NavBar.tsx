"use client";
import Link from "next/link";
import { Poppins } from "next/font/google";
import React, { useState } from "react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import NavBarSidebar from "./NavBar-sidebar";
import { MenuIcon } from "lucide-react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

interface NavBarItemProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}

const NavBarItem = ({ href, children, isActive }: NavBarItemProps) => {
  return (
    <Button
      asChild
      variant={"outline"}
      className={cn(
        "bg-transparent hover:bg-transparent rounded-full hover:border-primary border-transparent px-3.5 text-lg",
        isActive && "bg-black text-white hover:bg-black hover:text-white"
      )}
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
};

const navItems = [
  { href: "/", children: "Home" },
  { href: "/about", children: "About" },
  { href: "/features", children: "Features" },
  { href: "/pricing", children: "Pricing" },
  { href: "/contact", children: "Contact" },
];

const Navbar = () => {
  const pathName = usePathname();
  const [isSidebarOpen,SetisSideBarOpen] = useState(false)
  return (
<nav className="h-20 flex border-b justify-between font-medium bg-white items-center px-6">
  <Link href="/" className="flex items-center">
    <span className={cn("text-5xl font-semibold", poppins.className)}>
      NepKart
    </span>
  </Link>

  {/* Center Nav Items - only on large screens */}
  <div className="items-center gap-4 hidden lg:flex">
    {navItems.map((item) => (
      <NavBarItem
        key={item.href}
        href={item.href}
        isActive={pathName === item.href}
      >
        {item.children}
      </NavBarItem>
    ))}
  </div>

  {/* Right-side Auth Buttons - only on large screens */}
  <div className="hidden lg:flex gap-2">
    <Button
      asChild
      variant="secondary"
      className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-md bg-gray-100 hover:bg-pink-400 transition-colors text-lg"
    >
      <Link href={"/sign-in"}>Login</Link>
    </Button>
    <Button
      asChild
      className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-md bg-black text-white hover:bg-pink-400 hover:text-black transition-colors text-lg"
    >
      <Link href={"/sign-up"}>Start Selling</Link>
    </Button>
  </div>

  {/* Mobile Hamburger Button - only on small screens */}
  <div className="flex lg:hidden items-center justify-center">
    <Button
      variant="ghost"
      className="size-12 border-transparent bg-white"
      onClick={() => SetisSideBarOpen(true)}
    >
      <MenuIcon />
    </Button>
    <NavBarSidebar open={isSidebarOpen} onOpenChange={SetisSideBarOpen} items={navItems} />
  </div>
</nav>

  );
};

export default Navbar;
