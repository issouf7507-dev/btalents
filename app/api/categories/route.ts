// app/api/categories/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma as db } from "@/lib/prisma";
import { z } from "zod";
import { createCategory, getCategories } from "@/lib/api/categories";
import { auth } from "@/lib/auth";

const createSchema = z.object({
  name: z.string().min(1, "Le nom est obligatoire").max(100),
  slug: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const user = await db.user.findUnique({ where: { id: session.user.id } });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const body = await req.json();
    const parsed = createSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 422 },
      );
    }
    const category = await createCategory(parsed.data);

    return NextResponse.json(category, { status: 201 });
  } catch (err) {
    console.error("[POST /api/categories]", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await db.user.findUnique({ where: { id: session.user.id } });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const categories = await getCategories();
    return NextResponse.json(categories, { status: 200 });
  } catch (err) {
    console.error("[GET /api/categories]", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
