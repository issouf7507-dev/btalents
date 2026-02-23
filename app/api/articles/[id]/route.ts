import { NextRequest, NextResponse } from "next/server";
import { prisma as db } from "@/lib/prisma";
import { z } from "zod";
import { ArticleStatus } from "@/generated/prisma/enums";
import { auth } from "@/lib/auth";
import { getArticleById, updateArticle } from "@/lib/api/articles/repository";

const updateSchema = z.object({
  title: z.string().min(1, "Le titre est obligatoire").max(255),
  slug: z.string().optional(),
  excerpt: z.string().max(500).optional(),
  content: z.string().min(1, "Le contenu est obligatoire"),
  coverImage: z.string().optional(),
  status: z.nativeEnum(ArticleStatus).default("draft"),
  categoryId: z.string().cuid().optional().nullable(),
  tags: z.array(z.string()).default([]),
  metaTitle: z.string().max(60).optional(),
  metaDescription: z.string().max(160).optional(),
});

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const article = await getArticleById(id);

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json(article, { status: 200 });
  } catch (err) {
    console.error("[GET /api/articles/:id]", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

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

    const { id } = await params;
    const body = await req.json();
    const parsed = updateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 422 },
      );
    }

    const {
      title,
      slug: rawSlug,
      excerpt,
      content,
      coverImage,
      status,
      categoryId,
      tags,
      metaTitle,
      metaDescription,
    } = parsed.data;

    const article = await updateArticle(
      id,
      title,
      rawSlug ?? "",
      excerpt ?? "",
      content,
      coverImage ?? "",
      status,
      categoryId ?? "",
      metaTitle ?? "",
      metaDescription ?? "",
      tags,
    );

    if (!article) {
      return NextResponse.json(
        { error: "Failed to update article" },
        { status: 500 },
      );
    }

    return NextResponse.json(article, { status: 200 });
  } catch (err) {
    console.error("[PATCH /api/articles/:id]", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
