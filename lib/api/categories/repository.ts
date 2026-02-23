import { Category } from "@/generated/prisma/client";
import { prisma as db } from "@/lib/prisma";
import { NextResponse } from "next/server";
import slugify from "slugify";

export const getCategories = async () => {
  return await db.category.findMany({
    include: {
      _count: {
        select: {
          articles: true,
        },
      },
    },
  });
};

export const getCategoryById = async (id: string) => {
  return await db.category.findUnique({ where: { id } });
};

export const createCategory = async (parsed: {
  name: string;
  slug?: string;
}) => {
  const { name, slug: rawSlug } = parsed;

  const slug =
    rawSlug?.trim() ||
    slugify(name, { lower: true, strict: true, locale: "fr" });

  // Vérifier l'unicité du slug
  const existing = await db.category.findUnique({ where: { slug } });
  if (existing) {
    return NextResponse.json(
      { error: { slug: ["Ce slug est déjà utilisé"] } },
      { status: 409 },
    );
  }

  return await db.category.create({ data: { name, slug } });
};

export const updateCategory = async (
  id: string,
  parsed: {
    name: string;
    slug?: string;
  },
) => {
  const { name, slug: rawSlug } = parsed;

  const existing = await db.category.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json(
      { error: "Catégorie introuvable" },
      { status: 404 },
    );
  }

  // Recalculer le slug si le nom change et qu'aucun slug explicite n'est fourni
  const slug =
    rawSlug?.trim() ||
    (name
      ? slugify(name, { lower: true, strict: true, locale: "fr" })
      : existing.slug);

  // Vérifier l'unicité du slug (sauf si c'est le même)
  if (slug !== existing.slug) {
    const conflict = await db.category.findUnique({ where: { slug } });

    if (conflict) {
      return NextResponse.json(
        { error: { slug: ["Ce slug est déjà utilisé"] } },
        { status: 409 },
      );
    }
  }

  const updated = await db.category.update({
    where: { id },
    data: {
      ...(name && { name }),
      slug,
    },
  });

  return updated;
};

export const deleteCategory = async (id: string) => {
  // return await db.category.delete({ where: { id } });

  const existing = await db.category.findUnique({
    where: { id },
    include: { _count: { select: { articles: true } } },
  });

  if (!existing) {
    return NextResponse.json(
      { error: "Catégorie introuvable" },
      { status: 404 },
    );
  }

  // Bloquer la suppression si des articles sont liés
  if (existing._count.articles > 0) {
    return NextResponse.json(
      {
        error: `Impossible de supprimer : ${existing._count.articles} article(s) utilisent cette catégorie.`,
      },
      { status: 409 },
    );
  }

  return await db.category.delete({ where: { id } });
};
