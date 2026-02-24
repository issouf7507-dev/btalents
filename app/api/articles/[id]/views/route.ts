// app/api/articles/[id]/views/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma as db } from "@/lib/prisma";

/**
 * POST /api/articles/[id]/views
 * Incrémente le compteur de vues d'un article.
 * À appeler côté client au montage de la page article publique.
 *
 * Exemple d'usage dans un Client Component :
 *   useEffect(() => {
 *     fetch(`/api/articles/${id}/views`, { method: "POST" });
 *   }, [id]);
 */
export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const article = await db.article.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!article) {
      return NextResponse.json(
        { error: "Article introuvable" },
        { status: 404 },
      );
    }

    const updated = await db.article.update({
      where: { id },
      data: { views: { increment: 1 } },
      select: { views: true },
    });

    return NextResponse.json({ views: updated.views });
  } catch (err) {
    console.error("[POST /api/articles/:id/views]", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
