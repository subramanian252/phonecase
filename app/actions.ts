"use server";

import {
  CaseColor,
  CaseFinish,
  CaseMaterial,
  Order,
  PhoneModel,
} from "@prisma/client";
import prisma from "./lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { BASE_PRICE, PRODUCT_PRICES } from "./lib/products";
import { stripe } from "./lib/stripe";

export type argsTypes = {
  id: string;
  color: CaseColor;
  finish: CaseFinish;
  material: CaseMaterial;
  model: PhoneModel;
};

export async function saveConfig({
  id,
  color,
  finish,
  material,
  model,
}: argsTypes) {
  const configuration = await prisma.configuration.update({
    where: {
      id,
    },
    data: {
      caseColor: color,
      caseFinish: finish,
      caseMaterial: material,
      phoneModel: model,
    },
  });
}

export async function createPaymentSession(configId: string) {
  const configuration = await prisma.configuration.findUnique({
    where: {
      id: configId,
    },
  });

  if (!configuration) throw new Error("Configuration not found");

  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user) {
    throw new Error("You need to be logged in");
  }

  console.log(user?.id);

  const { caseFinish: finish, caseMaterial: material } = configuration;

  let price = BASE_PRICE;

  if (finish === "textured") price += PRODUCT_PRICES.finish.textured;
  if (material === "polycarbonate")
    price += PRODUCT_PRICES.material.polycarbonate;

  let order: Order | undefined = undefined;

  const existingOrder = await prisma.order.findFirst({
    where: {
      userId: user.id,
      configurationId: configId,
    },
  });

  if (existingOrder) {
    order = existingOrder;
  } else {
    order = await prisma.order.create({
      data: {
        userId: user.id,
        configurationId: configId,
        amount: price,
      },
    });
  }
  const product = await stripe.products.create({
    name: `Phone Case - ${configuration.phoneModel}`,
    images: [configuration.imageUrl],
    default_price_data: {
      currency: "usd",
      unit_amount: price,
    },
  });

  const stripeSession = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: product.default_price as string,
        quantity: 1,
      },
    ],
    mode: "payment",
    payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ["US", "IN"],
    },
    success_url: `${process.env.NEXT_PUBLIC_URL}/thank-you?orderId=${order?.id}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/configure/preview?id=${configId}`,
    metadata: {
      orderId: order?.id,
      userId: user.id,
    },
  });

  return { url: stripeSession.url };
}

export async function getUserDetails() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const existingUser = await prisma.user.findUnique({
    where: {
      id: user?.id,
    },
  });
  if (!existingUser) {
    await prisma.user.create({
      data: {
        id: user?.id,
        email: user?.email as string,
      },
    });
  }

  return { success: true };
}

export async function getPaymentStatus({ orderId }: { orderId: string }) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) throw new Error("You need to be logged in");

  const order = await prisma.order.findFirst({
    where: {
      userId: user?.id,
      id: orderId,
    },
    include: {
      configuration: true,
      billingAddress: true,
      shippingAddress: true,
    },
  });
  if (!order) throw new Error("Order not found");

  if (order.isPaid) {
    return order;
  } else {
    return false;
  }
}
