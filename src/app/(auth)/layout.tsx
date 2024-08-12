import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="relative polka-dot">
      <Link
        className="absolute top-5 left-5 rounded-full border-2 border-slate-200 bg-blue-500 p-2"
        href={"/"}
      >
        <ArrowLeft className="text-white size-4 " />
      </Link>

      {children}
    </div>
  );
};

export default AuthLayout;
