"use client";

import { useMedia } from "react-use";
import { useState } from "react";
import { Menu } from "lucide-react";

import { Sheet, SheetTrigger, SheetContent, SheetTitle } from "./ui/sheet";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { NavButton } from "./nav-button";

const routes = [
  {
    href: "/",
    label: "Overview",
  },
  {
    href: "/dashboard",
    label: "Dashboard",
  },
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isMobile = useMedia("(max-width: 1024px)", false);
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };

  if (isMobile)
    return (
      <Sheet open={isOpen} onOpenChange={() => setIsOpen(false)}>
        <Button
          onClick={() => setIsOpen(true)}
          variant={"ghost"}
          size={"sm"}
          className="bg-white/20 hover:bg-white/30"
        >
          <Menu className="size-4 text-white" />
        </Button>

        <SheetContent side={"left"}>
          <SheetTitle>Manage-App</SheetTitle>
          <nav className="flex flex-col space-y-2 pt-8">
            {routes.map((route) => (
              <Button
                variant={route.href === pathname ? "default" : "ghost"}
                onClick={() => handleClick(route.href)}
                key={route.href}
              >
                {route.label}
              </Button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    );

  return (
    <div className="flex items-center gap-x-4">
      {routes.map((route) => (
        <NavButton
          href={route.href}
          key={route.href}
          isActive={pathname === route.href}
        >
          {route.label}
        </NavButton>
      ))}
    </div>
  );
};
