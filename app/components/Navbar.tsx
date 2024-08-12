import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import {
  getKindeServerSession,
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/server";

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
                <LogoutLink>
                  <Button variant="ghost">logout</Button>
                </LogoutLink>
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
                <div className="flex gap-x-2 mr-2">
                  <RegisterLink>
                    <Button variant="secondary">Register</Button>
                  </RegisterLink>
                  <LoginLink>
                    <Button className="" variant="outline">
                      Log in
                    </Button>
                  </LoginLink>
                </div>
                <div className="w-px h-6 bg-zinc-200 hidden sm:block " />
                <Link
                  href={"/configure/upload"}
                  className={buttonVariants({
                    variant: "default",
                    className: "hidden sm:flex items-center gap-1 ml-2",
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
