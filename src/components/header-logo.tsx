import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface HeaderLogoProps {
  dark?: boolean;
  visible?: boolean;
}

export const HeaderLogo = ({ dark, visible }: HeaderLogoProps) => {
  return (
    <Link
      href={"/"}
      className={cn(
        "lg:flex items-center space-x-2",
        visible ? "flex" : "hidden"
      )}
    >
      <Image src={"/logo-1.svg"} alt="logo" width={32} height={32} />
      <span
        className={cn(
          "text-xl font-semibold",
          dark ? "text-gray-700" : "text-white"
        )}
      >
        Manage-App
      </span>
    </Link>
  );
};
