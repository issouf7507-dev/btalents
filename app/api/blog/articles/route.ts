import { NextRequest, NextResponse } from "next/server";
import { prisma as db } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const articles = await db.article.findMany({
      where: {
        status: "published",
      },
      include: {
        author: { select: { id: true, name: true, avatar: true } },
        category: { select: { id: true, name: true, slug: true } },
        tags: true,
      },
      orderBy: {
        publishedAt: "desc",
      },
    });

    return NextResponse.json(articles, { status: 200 });
  } catch (err) {
    console.error("[GET /api/blog/articles]", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
