import prisma from "@/app/lib/db";
import { stripe } from "@/app/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import OrderReceived from "@/app/components/emails/OrderReceived";
import { error } from "console";

const resend = new Resend(process.env.RESEND_TOKEN);

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = headers().get("stripe-signature");

    if (!signature) {
      return new Response("No signature", { status: 400 });
    }

    const event = await stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === "checkout.session.completed") {
      if (!event.data.object.customer_details?.email) {
        throw new Error("No customer email");
      }
      const session = event.data.object as Stripe.Checkout.Session;

      const { userId, orderId } = session.metadata || {
        userId: "",
        orderId: "",
      };

      if (!userId || !orderId) {
        throw new Error("No userId or orderId");
      }

      const billingAddress = session.customer_details?.address;
      const shippingAddress = session.shipping_details?.address;

      const updatedOrder = await prisma.order.update({
        where: {
          id: orderId,
        },
        data: {
          isPaid: true,
          shippingAddress: {
            create: {
              name: session.customer_details?.name || "",
              city: shippingAddress?.city!,
              country: shippingAddress?.country!,
              street: shippingAddress?.line1!,
              postalCode: shippingAddress?.postal_code!,
              state: shippingAddress?.state,
            },
          },
          billingAddress: {
            create: {
              name: session.customer_details?.name || "",
              city: billingAddress?.city!,
              country: billingAddress?.country!,
              street: billingAddress?.line1!,
              postalCode: billingAddress?.postal_code!,
              state: billingAddress?.state,
            },
          },
        },
      });
      const { data, error: reerror } = await resend.emails.send({
        from: "PhoneCase <onboarding@resend.dev>",
        to: [event.data.object.customer_details?.email],
        subject: "Your order was successfully placed",
        react: OrderReceived({
          // @ts-ignore
          shippingAddress: {
            name: session.customer_details?.name || "",
            city: shippingAddress?.city!,
            country: shippingAddress?.country!,
            street: shippingAddress?.line1!,
            postalCode: shippingAddress?.postal_code!,
            // @ts-ignore
            state: shippingAddress?.state,
          },
          orderId,
          orderDate: updatedOrder.createdAt.toDateString(),
        }),
      });
    }
    return NextResponse.json({ result: event, ok: true });
  } catch (err) {
    console.log(err);

    return new Response("Error", { status: 500 });
  }
}
