import { currentUser } from "@clerk/nextjs/server";

import { HeaderLogo } from "@/components/header-logo";
import { Navigation } from "@/components/navigation";
import { UserAuth } from "@/components/user-auth";

export const Header = async () => {
  const user = await currentUser();

  return (
    <header className="bg-gradient-to-b from-blue-700 to-blue-500/80 px-4 lg:px-10 pt-8 pb-28">
      <div className="flex items-center justify-between pb-14">
        <div className="flex items-center gap-x-14">
          <HeaderLogo />
          {user && <Navigation />}
        </div>

        <UserAuth />
      </div>
    </header>
  );
};
