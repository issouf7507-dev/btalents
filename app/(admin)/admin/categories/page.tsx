"use client";

/**
 * Page gestion des catégories
 * Route : /dashboard/categories
 *
 * Dépendances : déjà installées (shadcn/ui, slugify)
 */

import { useState } from "react";
import slugify from "slugify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
    Pencil,
    Trash2,
    Plus,
    Check,
    X,
    FolderOpen,
    Loader2,
} from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createCategoryService, deleteCategoryService, getCategoriesService, updateCategoryService } from "@/lib/api/categories/services";
import { CategoryDTO } from "@/lib/api/categories/types";

import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

// ─── Types ────────────────────────────────────────────────────────────────────

interface Category {
    id: string;
    name: string;
    slug: string;
    /** nombre d'articles liés — renvoyé par Prisma avec _count */
    _count?: { articles: number };
}

// ─── Mock data (remplacer par fetch Prisma) ───────────────────────────────────



// ─── Inline row (création ou édition) ────────────────────────────────────────

interface InlineRowProps {
    initial?: { name: string; slug: string };
    onSave: (name: string, slug: string) => Promise<void>;
    onCancel: () => void;
}

function InlineRow({ initial, onSave, onCancel }: InlineRowProps) {
    const [name, setName] = useState(initial?.name ?? "");
    const [slug, setSlug] = useState(initial?.slug ?? "");
    const [autoSlug, setAutoSlug] = useState(!initial);
    const [saving, setSaving] = useState(false);

    const handleNameChange = (val: string) => {
        setName(val);
        if (autoSlug) {
            setSlug(slugify(val, { lower: true, strict: true, locale: "fr" }));
        }
    };

    const handleSave = async () => {
        if (!name.trim()) return;
        setSaving(true);
        await onSave(name.trim(), slug || slugify(name, { lower: true, strict: true, locale: "fr" }));
        setSaving(false);
    };

    return (
        <tr className="bg-muted/30 border-b">
            <td className="px-4 py-2">
                <Input
                    autoFocus
                    value={name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="Nom de la catégorie"
                    className="h-8 text-sm"
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleSave();
                        if (e.key === "Escape") onCancel();
                    }}
                />
            </td>
            <td className="px-4 py-2">
                <Input
                    value={slug}
                    onChange={(e) => { setAutoSlug(false); setSlug(e.target.value); }}
                    placeholder="slug-auto"
                    className="h-8 text-sm font-mono"
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleSave();
                        if (e.key === "Escape") onCancel();
                    }}
                />
            </td>
            <td className="px-4 py-2 text-muted-foreground text-sm">—</td>
            <td className="px-4 py-2">
                <div className="flex items-center gap-1">
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-emerald-600" onClick={handleSave} disabled={saving || !name.trim()}>
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                    </Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground" onClick={onCancel}>
                        <X className="w-4 h-4" />
                    </Button>
                </div>
            </td>
        </tr>
    );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>();
    const [creating, setCreating] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const query = useQuery({ queryKey: ['categories'], queryFn: getCategoriesService })

    // console.log(query.data ?? "No data");


    const categoryCreateMutation = useMutation({
        mutationFn: createCategoryService,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['categories'] })
        },
    })

    const categoryUpdateMutation = useMutation({
        mutationFn: updateCategoryService,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['categories'] })
        },
    })

    const categoryDeleteMutation = useMutation({
        mutationFn: deleteCategoryService,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['categories'] })
        },
    })

    // ── CRUD handlers (à brancher sur tes Server Actions / API routes) ─────────

    const handleCreate = async (name: string, slug: string) => {
        // 🔌 await createCategory({ name, slug })
        const newCat = {
            name,
            slug,
        };
        try {
            await categoryCreateMutation.mutateAsync(newCat);
            setCreating(false);
            toast.success("Catégorie créée !");
            query.refetch();
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdate = async (id: string, name: string, slug: string) => {
        const updatedCat = {
            id,
            name,
            slug,
        };
        try {
            await categoryUpdateMutation.mutateAsync(updatedCat);
            query.refetch();
            setEditingId(null);
            toast.success("Catégorie mise à jour !");
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        // 🔌 await deleteCategory(deleteId)
        // setCategories((prev) => prev.filter((c) => c.id !== deleteId));
        try {
            await categoryDeleteMutation.mutateAsync(deleteId);
            setDeleteId(null);
            toast.success("Catégorie supprimée.");
            query.refetch();

        } catch (error) {
            console.error(error);
            toast.error("Erreur lors de la suppression de la catégorie.");
        }

    };

    // const deleteTarget = categories.find((c) => c.id === deleteId);

    return (
        <>
            <div className="space-y-6 w-full px-10 py-10">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">Catégories</h1>
                        <p className="text-sm text-muted-foreground mt-0.5">
                            {query.data?.length} catégorie{query.data?.length > 1 ? "s" : ""}
                        </p>
                    </div>
                    <Button onClick={() => { setCreating(true); setEditingId(null); }} disabled={creating}>
                        <Plus className="w-4 h-4 mr-2" />
                        Nouvelle catégorie
                    </Button>
                </div>

                {/* Table */}
                <div className="rounded-xl border bg-card overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-muted/50 border-b text-xs uppercase tracking-wide text-muted-foreground">
                                <th className="text-left px-4 py-3 font-medium">Nom</th>
                                <th className="text-left px-4 py-3 font-medium">Slug</th>
                                <th className="text-left px-4 py-3 font-medium">Articles</th>
                                <th className="px-4 py-3" />
                            </tr>
                        </thead>
                        <tbody>
                            {/* Ligne de création */}
                            {creating && (
                                <InlineRow
                                    onSave={handleCreate}
                                    onCancel={() => setCreating(false)}
                                />
                            )}

                            {/* Lignes existantes */}
                            {query.data?.length === 0 && !creating ? (
                                <tr>
                                    <td colSpan={4} className="text-center py-16 text-muted-foreground">
                                        <FolderOpen className="w-10 h-10 mx-auto mb-3 opacity-30" />
                                        <p>Aucune catégorie pour l'instant</p>
                                    </td>
                                </tr>
                            ) : (
                                query.data?.map((cat: CategoryDTO) =>
                                    editingId === cat.id ? (
                                        <InlineRow
                                            key={cat.id}
                                            initial={{ name: cat.name, slug: cat.slug }}
                                            onSave={(name, slug) => handleUpdate(cat.id, name, slug)}
                                            onCancel={() => setEditingId(null)}
                                        />
                                    ) : (
                                        <tr key={cat.id} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                                            <td className="px-4 py-3 font-medium">{cat.name}</td>
                                            <td className="px-4 py-3">
                                                <code className="text-xs bg-muted px-1.5 py-0.5 rounded text-muted-foreground">
                                                    {cat.slug}
                                                </code>
                                            </td>
                                            <td className="px-4 py-3">
                                                <Badge variant="secondary">
                                                    {cat._count?.articles ?? 0} article{(cat._count?.articles ?? 0) > 1 ? "s" : ""}
                                                </Badge>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center justify-end gap-1">
                                                    <Button
                                                        size="icon"
                                                        variant="ghost"
                                                        className="h-8 w-8"
                                                        onClick={() => { setEditingId(cat.id); setCreating(false); }}
                                                    >
                                                        <Pencil className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        size="icon"
                                                        variant="ghost"
                                                        className="h-8 w-8 text-destructive hover:text-destructive"
                                                        onClick={() => setDeleteId(cat.id)}
                                                        disabled={(cat._count?.articles ?? 0) > 0}
                                                        title={(cat._count?.articles ?? 0) > 0 ? "Impossible de supprimer une catégorie utilisée" : "Supprimer"}
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                )
                            )}
                        </tbody>
                    </table>
                </div>

                {query.data?.some((c: CategoryDTO) => (c._count?.articles ?? 0) > 0) && (
                    <p className="text-xs text-muted-foreground">
                        * Une catégorie liée à des articles ne peut pas être supprimée. Réassignez d'abord les articles.
                    </p>
                )}
            </div>

            {/* Confirm delete */}
            <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Supprimer « {query.data?.find((c: CategoryDTO) => c.id === deleteId)?.name} » ?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Cette action est irréversible. La catégorie sera définitivement supprimée.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            Supprimer
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}