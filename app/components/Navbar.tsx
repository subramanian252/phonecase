import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

interface Props {}

async function Navbar(props: Props) {
  const {} = props;

  const { getUser } = getKindeServerSession();

  const user = await getUser();

  const isAdmin = user?.email === process.env.ADMIN_EMAIL;

  return (
    <nav className="sticky z-[100] h-14 backdrop-blur-lg ">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200 ">
          <Link href={"/"} className="text-xl font-semibold">
            case<span className="text-green-600">Cobra</span>
          </Link>
          <div className="flex items-center gap-1">
            {user ? (
              <>
                <Link
                  href={"/api/auth/logout"}
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}
                >
                  Sign out
                </Link>
                {isAdmin && (
                  <Link
                    href={"/dashboard"}
                    className={buttonVariants({ variant: "ghost", size: "sm" })}
                  >
                    Dashboard
                  </Link>
                )}
                <Link
                  href={"/configure/upload"}
                  className={buttonVariants({
                    variant: "ghost",
                    className: "hidden sm:flex items-center gap-1",
                  })}
                >
                  Create case
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </>
            ) : (
              <>
                <Link
                  href={"/api/auth/register"}
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}
                >
                  Sign up
                </Link>

                <Link
                  href={"/api/auth/login"}
                  className={buttonVariants({
                    variant: "ghost",
                    className: "hidden sm:flex items-center gap-1",
                  })}
                >
                  Login
                </Link>
                <div className="w-px h-6 bg-zinc-200 hidden sm:block" />
                <Link
                  href={"/configure/upload"}
                  className={buttonVariants({
                    variant: "default",
                    className: "hidden sm:flex items-center gap-1",
                  })}
                >
                  Create case
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
}

export default Navbar;
