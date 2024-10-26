"use server";

import db from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const getAuthStatus = async () => {
  const { getUser } = getKindeServerSession();
  const { id, email, given_name } = await getUser();
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
        email: email!,
        name: given_name!,
      },
    });
  }
  return { success: true };
};
