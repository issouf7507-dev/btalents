// app/api/categories/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma as db } from "@/lib/prisma";
import slugify from "slugify";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { deleteCategory, updateCategory } from "@/lib/api/categories";

const updateSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  slug: z.string().optional(),
});

// ─── PATCH /api/categories/[id] ──────────────────────────────────────────────

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const user = await db.user.findUnique({ where: { id: session.user.id } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const existing = await db.category.findUnique({
      where: { id: (await params).id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Catégorie introuvable" },
        { status: 404 },
      );
    }

    const body = await req.json();

    const parsed = updateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 422 },
      );
    }

    const updated = await updateCategory((await params).id, {
      name: parsed.data.name ?? "",
      slug: parsed.data.slug,
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error("[PATCH /api/categories/:id]", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// ─── DELETE /api/categories/[id] ─────────────────────────────────────────────

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const user = await db.user.findUnique({ where: { id: session.user.id } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const deleted = await deleteCategory((await params).id);
    if (!deleted) {
      return NextResponse.json(
        { error: "Catégorie introuvable" },
        { status: 404 },
      );
    }

    return NextResponse.json({ message: "Catégorie supprimée avec succès" });
  } catch (err) {
    console.error("[DELETE /api/categories/:id]", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
