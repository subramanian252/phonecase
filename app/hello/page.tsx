import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import React from "react";
import { unstable_noStore as nostore } from "next/cache";

interface Props {}

async function Page(props: Props) {
  const {} = props;
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <div>
      <h1>Hello {user?.email}</h1>
    </div>
  );
}

export default Page;
