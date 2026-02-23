"use client"
import { BlogPostCard } from '@/components/ui/card-18';
import { motion, Variants } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { getPublishedArticlesService } from '@/lib/api/blog/services';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Loader2 } from 'lucide-react';

interface Article {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    coverImage: string;
    publishedAt: string;
    category: {
        name: string;
        slug: string;
    } | null;
    tags: Array<{ name: string }>;
}

// Animation variants for the container to stagger children
const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

// Animation variants for child items
const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: 'easeOut',
        },
    },
};


export default function BlogPage() {
    const { data: articles = [], isLoading } = useQuery({
        queryKey: ['published-articles'],
        queryFn: getPublishedArticlesService,
    });

    // Séparer l'article mis en avant (le plus récent) et les autres
    const featuredArticle = articles[0];
    const otherArticles = articles.slice(1);

    // Mapper les articles au format attendu par BlogPostCard
    const mapArticleToPost = (article: Article) => ({
        tag: article.category?.name || 'Article',
        date: article.publishedAt
            ? format(new Date(article.publishedAt), "MMM d, yyyy", { locale: fr }).toUpperCase()
            : '',
        title: article.title,
        description: article.excerpt || '',
        href: `/blog/${article.slug}`,
        imageUrl: article.coverImage || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop',
    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        );
    }

    return (
        <div>
            <div className='h-[300px] bg-cover bg-center flex items-center justify-center'
                style={{ backgroundImage: 'url(/imgs/Rectangle.png)' }}>
                <h1 className='text-7xl font-bold text-white'>Articles</h1>
            </div>



            <div>

                <div className="w-full max-w-7xl mx-auto p-4 md:p-8 mt-5">
                    <h2 className='text-5xl font-bold text-center text-[#789f78]'>Tous les articles</h2>
                </div>
            </div>

            <div className="w-full max-w-7xl mx-auto p-4 md:p-8 mt-5">
                {featuredArticle && (
                    <motion.div variants={itemVariants as Variants} initial="hidden" animate="visible" className="mb-8 md:mb-12">
                        <BlogPostCard
                            variant="featured"
                            {...mapArticleToPost(featuredArticle)}
                        />
                    </motion.div>
                )}


                {otherArticles.length > 0 && (
                    <motion.div
                        className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {otherArticles.map((article: Article, index: number) => (
                            <motion.div key={article.id} variants={itemVariants as Variants}>
                                <BlogPostCard {...mapArticleToPost(article)} />
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {!featuredArticle && !isLoading && (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">Aucun article publié pour le moment.</p>
                    </div>
                )}
            </div>
        </div>
    );
}