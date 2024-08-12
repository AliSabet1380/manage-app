"use client";

import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";
import { Loader2, LogIn } from "lucide-react";

export const UserAuth = () => {
  return (
    <>
      <SignedOut>
        <Button
          variant={"ghost"}
          className="bg-white/20 text-white hover:bg-white/30 hover:text-white"
          asChild
        >
          <Link href={"/sign-in"} className="flex items-center">
            <LogIn className="size-4 mr-2" />
            <span>Login</span>
          </Link>
        </Button>
      </SignedOut>

      <SignedIn>
        <ClerkLoading>
          <Loader2 className="text-white/70 size-5 animate-spin" />
        </ClerkLoading>

        <ClerkLoaded>
          <UserButton />
        </ClerkLoaded>
      </SignedIn>
    </>
  );
};
