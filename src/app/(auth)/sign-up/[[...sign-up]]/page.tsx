import { ClerkLoaded, ClerkLoading, SignUp } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import Image from "next/image";

const SignUpPage = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center space-y-3">
          <h2 className="text-2xl text-muted-foreground font-medium">
            Welcome To My App
          </h2>
          <ClerkLoaded>
            <SignUp path="/sign-up" />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="size-6 animate-spin" />
          </ClerkLoading>
        </div>
      </div>

      <div className="bg-blue-700 hidden lg:flex items-center justify-center">
        <Image src={"/logo-1.svg"} alt="logo" width={100} height={100} />
      </div>
    </div>
  );
};

export default SignUpPage;
