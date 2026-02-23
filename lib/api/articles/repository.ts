import { prisma as db } from "@/lib/prisma";
import slugify from "slugify";

import { NextResponse } from "next/server";
import { ArticleStatus } from "@/generated/prisma/enums";

export const createArticle = async (
  title: string,
  rawSlug: string,
  excerpt: string,
  content: string,
  coverImage: string,
  status: ArticleStatus,
  categoryId: string,
  authorId: string,
  metaTitle: string,
  metaDescription: string,
  tags: string[],
  userId: string,
) => {
  const slug =
    rawSlug?.trim() ||
    slugify(title, { lower: true, strict: true, locale: "fr" });

  // Vérifier l'unicité du slug
  const existing = await db.article.findUnique({ where: { slug } });
  if (existing) {
    return NextResponse.json(
      { error: { slug: ["Ce slug est déjà utilisé"] } },
      { status: 409 },
    );
  }

  // Upsert les tags et récupérer leurs IDs
  const tagRecords = await Promise.all(
    tags.map((name) =>
      db.tag.upsert({
        where: { name: name.toLowerCase() },
        create: { name: name.toLowerCase() },
        update: {},
      }),
    ),
  );

  const article = await db.article.create({
    data: {
      userId: userId,
      title,
      slug,
      excerpt,
      content,
      coverImage: coverImage || null,
      status,
      publishedAt: status === "published" ? new Date() : null,
      categoryId: categoryId ?? null,
      authorId,
      metaTitle,
      metaDescription,
      tags: {
        connect: tagRecords.map((t) => ({ id: t.id })),
      },
    },
    include: {
      author: { select: { id: true, name: true, avatar: true } },
      category: { select: { id: true, name: true, slug: true } },
      tags: true,
    },
  });

  return article;
};

export const getArticles = async () => {
  const articles = await db.article.findMany({
    include: {
      author: { select: { id: true, name: true, avatar: true } },
      category: { select: { id: true, name: true, slug: true } },
      tags: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return articles;
};

export const getArticleById = async (id: string) => {
  const article = await db.article.findUnique({
    where: { id },
    include: {
      author: { select: { id: true, name: true, avatar: true } },
      category: { select: { id: true, name: true, slug: true } },
      tags: true,
    },
  });
  return article;
};

export const updateArticle = async (
  id: string,
  title: string,
  rawSlug: string,
  excerpt: string,
  content: string,
  coverImage: string,
  status: ArticleStatus,
  categoryId: string,
  metaTitle: string,
  metaDescription: string,
  tags: string[],
) => {
  const slug =
    rawSlug?.trim() ||
    slugify(title, { lower: true, strict: true, locale: "fr" });

  // Vérifier l'unicité du slug (sauf pour l'article actuel)
  const existing = await db.article.findFirst({
    where: { slug, NOT: { id } },
  });
  if (existing) {
    return NextResponse.json(
      { error: { slug: ["Ce slug est déjà utilisé"] } },
      { status: 409 },
    );
  }

  // Upsert les tags et récupérer leurs IDs
  const tagRecords = await Promise.all(
    tags.map((name) =>
      db.tag.upsert({
        where: { name: name.toLowerCase() },
        create: { name: name.toLowerCase() },
        update: {},
      }),
    ),
  );

  const article = await db.article.update({
    where: { id },
    data: {
      title,
      slug,
      excerpt,
      content,
      coverImage: coverImage || null,
      status,
      publishedAt: status === "published" ? new Date() : null,
      categoryId: categoryId ?? null,
      metaTitle,
      metaDescription,
      tags: {
        set: [],
        connect: tagRecords.map((t) => ({ id: t.id })),
      },
    },
    include: {
      author: { select: { id: true, name: true, avatar: true } },
      category: { select: { id: true, name: true, slug: true } },
      tags: true,
    },
  });

  return article;
};
