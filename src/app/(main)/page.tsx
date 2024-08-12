import { HeaderLogo } from "@/components/header-logo";
import { Check } from "lucide-react";
import Image from "next/image";

const HomePage = () => {
  return (
    <div className=" w-full ">
      <div className="w-full flex flex-col items-center space-y-16 lg:space-y-40 p-20">
        <h1 className="text-3xl font-semibold text-muted-foreground">
          Welcome to Manage-App
        </h1>

        <div className="w-full flex flex-col lg:flex-row items-center lg:justify-between lg:px-10">
          <div className="flex flex-col items-start space-y-5">
            <h3 className="text-xl font-medium text-gray-600">
              We Help You Manage You Payment
            </h3>
            <p className="text-gray-500  ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci,
              excepturi.
            </p>
            <div className="flex flex-col items-start space-y-2">
              <div className="flex items-center">
                <Check className="size-4 text-green-600 mr-2" />
                <span className="text-xs text-gray-600 font-semibold">
                  100% free manage app
                </span>
              </div>
              <div className="flex items-center">
                <Check className="size-4 text-green-600 mr-2" />
                <span className="text-xs text-gray-600 font-semibold">
                  Best app in manging payments
                </span>
              </div>
              <div className="flex items-center">
                <Check className="size-4 text-green-600 mr-2" />
                <span className="text-xs text-gray-600 font-semibold">
                  100% for parctice ( not-real )
                </span>
              </div>
            </div>
          </div>

          <Image src={"/landing.webp"} alt="logo" width={450} height={450} />
        </div>
      </div>
      <div className="w-full border-t border-slate-400 bg-slate-50">
        <div className="flex items-center justify-between px-4 pt-6 pb-32">
          <HeaderLogo visible={true} dark={true} />

          <span className="font-semibold text-gray-600">Made by Ali-Sabet</span>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
