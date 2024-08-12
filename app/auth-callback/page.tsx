"use client";

import { getUserDetails } from "@/app/actions";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { unstable_noStore } from "next/cache";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface Props {}

function Page(props: Props) {
  const {} = props;

  const [configId, setConfigId] = React.useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const configurationId = localStorage.getItem("configId");
    if (configurationId) setConfigId(configurationId);
  }, []);

  const { data } = useQuery({
    queryKey: ["config"],
    queryFn: async () => await getUserDetails(),
    retry: true,
    retryDelay: 1000,
  });

  if (data?.success) {
    if (configId) {
      localStorage.removeItem("configId");
      router.push(`/configure/preview?id=${configId}`);
    } else {
      router.push(`/`);
    }
  }

  return (
    <div className="w-full mt-24 flex items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="w-10 h-10 mx-auto animate-spin" />
        <h3 className="text-2xl font-semibold">Logging you in...</h3>
        <p>You will be redirected automatically</p>
      </div>
    </div>
  );
}

export default Page;
