import React, { Suspense } from "react";
import Thankyou from "../components/Thankyou";

interface Props {}

function Page(props: Props) {
  const {} = props;

  return (
    <Suspense>
      <Thankyou />
    </Suspense>
  );
}

export default Page;
