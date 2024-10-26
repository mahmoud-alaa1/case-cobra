"use server";

import db from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const getAuthStatus = async () => {
  const { getUser } = getKindeServerSession();
  const { id, email } = await getUser();
  if (!id || !email) {
    throw new Error("Invalid User Data");
  }
  const existingUser = await db.user.findUnique({
    where: { id },
  });
  if (!existingUser) {
    await db.user.create({
      data: {
        id,
        email,
      },
    });
  }
  return { success: true };
};
