"use server";

import db from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const getPaymentStatus = async ({ orderId }: { orderId: string }) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  console.log("user", user);
  if (!user?.id || !user.email) {
    throw new Error("You need to be logged in to view this page");
  }

  const order = await db.order.findUnique({
    where: {
      userId: user.id,
      id: orderId,
    },
    include: {
      billingAddress: true,
      configuration: true,
      shippingAddress: true,
      user: true,
    },
  });
  if (!order) {
    throw new Error("Order not found");
  }
  if (order.isPaid) {
    return order;
  } else {
    return false;
  }
};
