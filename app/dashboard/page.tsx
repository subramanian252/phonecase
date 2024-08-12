import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { notFound } from "next/navigation";
import React from "react";
import prisma from "../lib/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DropDown from "../components/DropDown";
import { unstable_noStore as nostore } from "next/cache";

interface Props {}

async function Page(props: Props) {
  nostore();

  const {} = props;

  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user || user.email !== process.env.ADMIN_EMAIL) return notFound();

  const data = await prisma.order.findMany({
    where: {
      isPaid: true,
      createdAt: {
        gte: new Date(Date.now() - 24 * 60 * 60 * 1000 * 7),
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      configuration: true,
      shippingAddress: true,
      user: true,
    },
  });

  const aggregateSum = await prisma.order.aggregate({
    where: {
      isPaid: true,
      createdAt: {
        gte: new Date(Date.now() - 24 * 60 * 60 * 1000 * 7),
      },
    },
    _sum: {
      amount: true,
    },
  });

  const aggregateSumMonthly = await prisma.order.aggregate({
    where: {
      isPaid: true,
      createdAt: {
        gte: new Date(Date.now() - 24 * 60 * 60 * 1000 * 30),
      },
    },
    _sum: {
      amount: true,
    },
  });

  return (
    <div className="bg-muted/50 min-h-screen">
      <div className="max-w-7xl w-full mx-auto flex flex-col sm:gap-4 sm:py-4 ">
        <div className="flex flex-col gap-4 lg:flex-row">
          <Card className="w-full">
            <CardHeader>
              <CardDescription>Weekly revenue</CardDescription>
              <CardTitle>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format((aggregateSum._sum.amount as number) / 100)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground -mt-2">
                of{" "}
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(500)}{" "}
                goal
              </p>
            </CardContent>
            <CardFooter>
              <Progress
                value={((aggregateSum._sum.amount as number) / 100 / 500) * 100}
              />
            </CardFooter>
          </Card>

          <Card className="w-full">
            <CardHeader>
              <CardDescription>Monthly revenue</CardDescription>
              <CardTitle>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format((aggregateSumMonthly._sum.amount as number) / 100)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground -mt-2">
                of{" "}
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(2500)}{" "}
                goal
              </p>
            </CardContent>
            <CardFooter>
              <Progress
                value={
                  ((aggregateSumMonthly._sum.amount as number) / 100 / 2500) *
                  100
                }
              />
            </CardFooter>
          </Card>
        </div>
        <div className="w-full mt-10">
          <h1 className="text-3xl font-bold">Incoming Orders</h1>
          <div>
            <Table>
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Customer</TableHead>
                  <TableHead className="sm:hidden md:table-cell">
                    Status
                  </TableHead>
                  <TableHead className="sm:hidden md:table-cell">
                    Purchase Date
                  </TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.user.email}</TableCell>
                    <TableCell className="sm:hidden md:table-cell">
                      <DropDown status={order.status} orderId={order.id} />
                    </TableCell>
                    <TableCell className="sm:hidden md:table-cell">
                      {order.createdAt.toDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format((order.amount as number) / 100)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
