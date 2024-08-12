import DesignPreview from "@/app/components/DesignPreview";
import prisma from "@/app/lib/db";
import { notFound } from "next/navigation";
import React from "react";
import { unstable_noStore as nostore } from "next/cache";

interface Props {
  searchParams: {
    id: string;
  };
}

async function Page(props: Props) {
  nostore();
  const {
    searchParams: { id },
  } = props;

  if (!id || typeof id !== "string") {
    notFound();
  }

  const configuration = await prisma.configuration.findUnique({
    where: {
      id,
    },
  });

  if (!configuration) return notFound();

  return <DesignPreview configuration={configuration} />;
}

export default Page;
