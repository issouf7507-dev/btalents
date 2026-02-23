import { auth } from "./auth";
import { headers } from "next/headers";
import { cache } from "react";

export const getSession = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session;
});

export const requireAuth = async () => {
  const session = await getSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  return session;
};

export const requireAdmin = async () => {
  const session = await requireAuth();

  if (!session.user) {
    throw new Error("Unauthorized");
  }

  // Check if user has admin role in the database
  const { prisma } = await import("./prisma");
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user || user.role !== "admin") {
    throw new Error("Forbidden: Admin access required");
  }

  return { session, user };
};
