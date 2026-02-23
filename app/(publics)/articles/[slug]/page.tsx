"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getArticleBySlugService } from "@/lib/api/blog/services";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { ArrowLeft, Calendar, User, Tag, Eye, Loader2 } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  publishedAt: string;
  views: number;
  author: {
    id: string;
    name: string;
    avatar: string | null;
  };
  category: {
    id: string;
    name: string;
    slug: string;
  } | null;
  tags: Array<{ id: string; name: string }>;
  metaTitle?: string;
  metaDescription?: string;
}

export default function ArticlePage() {
  const params = useParams();
  const slug = params?.slug as string;

  const { data: article, isLoading, error } = useQuery<Article>({
    queryKey: ["article", slug],
    queryFn: () => getArticleBySlugService(slug),
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Article non trouvé</h1>
        <p className="text-muted-foreground mb-8">
          L'article que vous recherchez n'existe pas ou a été supprimé.
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-primary hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour au blog
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Hero Section with Cover Image */}
      {article.coverImage && (
        <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      )}

      {/* Article Content */}
      <div className="w-full max-w-4xl mx-auto px-4 md:px-8">
        {/* Back Button */}
        <div className="py-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour au blog
          </Link>
        </div>

        {/* Article Header */}
        <article className="pb-16">
          {/* Category */}
          {article.category && (
            <Badge variant="secondary" className="mb-4">
              {article.category.name}
            </Badge>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Excerpt */}
          {article.excerpt && (
            <p className="text-xl text-muted-foreground mb-8">
              {article.excerpt}
            </p>
          )}

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b">
            {/* Author */}
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={article.author.avatar || undefined} />
                <AvatarFallback>
                  {article.author.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{article.author.name}</p>
                <p className="text-xs text-muted-foreground">Auteur</p>
              </div>
            </div>

            {/* Date */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              {format(new Date(article.publishedAt), "d MMMM yyyy", {
                locale: fr,
              })}
            </div>

            {/* Views */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Eye className="w-4 h-4" />
              {article.views} vues
            </div>
          </div>

          {/* Article Content */}
          <div
            className="prose prose-lg dark:prose-invert max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Tags */}
          {article.tags.length > 0 && (
            <div className="pt-8 border-t">
              <div className="flex items-center gap-2 mb-4">
                <Tag className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">
                  Tags
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Badge key={tag.id} variant="outline">
                    {tag.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
