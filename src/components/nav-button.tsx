import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import Link from "next/link";

interface NavButtonProps {
  children: Readonly<React.ReactNode>;
  isActive?: boolean;

  href: string;
}

export const NavButton = ({ children, href, isActive }: NavButtonProps) => {
  return (
    <Button
      variant={"ghost"}
      className={cn(
        "text-white hover:text-white hover:bg-white/30",
        isActive && "bg-white/20"
      )}
      asChild
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
};
