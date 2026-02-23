import { NextRequest, NextResponse } from "next/server";
import { prisma as db } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const article = await db.article.findUnique({
      where: {
        slug,
        status: "published",
      },
      include: {
        author: { select: { id: true, name: true, avatar: true } },
        category: { select: { id: true, name: true, slug: true } },
        tags: true,
      },
    });

    if (!article) {
      return NextResponse.json(
        { error: "Article not found" },
        { status: 404 }
      );
    }

    // Increment views
    await db.article.update({
      where: { id: article.id },
      data: { views: { increment: 1 } },
    });

    return NextResponse.json(article, { status: 200 });
  } catch (err) {
    console.error("[GET /api/blog/articles/:slug]", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
