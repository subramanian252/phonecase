import DesignConfigurator from "@/app/components/DesignConfigurator";
import prisma from "@/app/lib/db";
import { unstable_noStore as nostore } from "next/cache";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  searchParams: any;
}

async function Page(props: Props) {
  nostore();
  const { searchParams } = props;

  const { id } = searchParams;

  if (!id) return notFound();

  const configuration = await prisma.configuration.findUnique({
    where: {
      id: id as string,
    },
  });

  if (!configuration) return notFound();

  const { width, height } = configuration;

  return (
    <DesignConfigurator
      id={configuration.id}
      dimesnisons={{ width, height }}
      imageUrl={configuration.imageUrl}
    />
  );
}

export default Page;
