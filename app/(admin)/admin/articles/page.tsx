"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    MoreHorizontal,
    Plus,
    Search,
    Eye,
    Pencil,
    Trash2,
    ArrowUpDown,
    Newspaper,
    TrendingUp,
    FileText,
    CheckCircle2,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getArticlesService } from "@/lib/api/articles";

// ─── Types ───────────────────────────────────────────────────────────────────

type ArticleStatus = "published" | "draft" | "archived";

interface Article {
    id: string;
    title: string;
    coverImage: string | null;
    author: {
        name: string;
        avatar: string | null;
    };
    status: ArticleStatus;
    publishedAt: Date | null;
    createdAt: Date;
    views: number;
}

// ─── Mock data (à remplacer par ton fetch Prisma) ────────────────────────────

const MOCK_ARTICLES: Article[] = [
    {
        id: "1",
        title: "Pourquoi Next.js 15 change la donne pour les apps modernes",
        coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=120&h=80&fit=crop",
        author: { name: "Sophie Martin", avatar: null },
        status: "published",
        publishedAt: new Date("2024-11-15"),
        createdAt: new Date("2024-11-10"),
        views: 3842,
    },
    {
        id: "2",
        title: "Guide complet de Tailwind CSS v4",
        coverImage: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=120&h=80&fit=crop",
        author: { name: "Lucas Bernard", avatar: null },
        status: "published",
        publishedAt: new Date("2024-11-01"),
        createdAt: new Date("2024-10-28"),
        views: 2109,
    },
    {
        id: "3",
        title: "Construire une API REST avec Prisma et PostgreSQL",
        coverImage: null,
        author: { name: "Émilie Dupont", avatar: null },
        status: "draft",
        publishedAt: null,
        createdAt: new Date("2024-11-18"),
        views: 0,
    },
    {
        id: "4",
        title: "Les meilleures pratiques TypeScript en 2024",
        coverImage: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=120&h=80&fit=crop",
        author: { name: "Sophie Martin", avatar: null },
        status: "archived",
        publishedAt: new Date("2024-09-12"),
        createdAt: new Date("2024-09-08"),
        views: 891,
    },
    {
        id: "5",
        title: "Introduction à Tiptap : éditeur riche pour React",
        coverImage: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=120&h=80&fit=crop",
        author: { name: "Lucas Bernard", avatar: null },
        status: "draft",
        publishedAt: null,
        createdAt: new Date("2024-11-20"),
        views: 0,
    },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<ArticleStatus, { label: string; variant: "default" | "secondary" | "outline" }> = {
    published: { label: "Publié", variant: "default" },
    draft: { label: "Brouillon", variant: "secondary" },
    archived: { label: "Archivé", variant: "outline" },
};

function formatNumber(n: number): string {
    if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
    return n.toString();
}

function getInitials(name: string): string {
    return name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
}

// ─── Stats cards ──────────────────────────────────────────────────────────────

function StatsCards({ articles }: { articles: Article[] }) {
    const published = articles.filter((a) => a.status === "published").length;
    const drafts = articles.filter((a) => a.status === "draft").length;
    const totalViews = articles.reduce((acc, a) => acc + a.views, 0);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
                { icon: CheckCircle2, label: "Publiés", value: published, color: "text-emerald-600" },
                { icon: FileText, label: "Brouillons", value: drafts, color: "text-amber-600" },
                { icon: TrendingUp, label: "Vues totales", value: formatNumber(totalViews), color: "text-blue-600" },
            ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="bg-card border rounded-xl p-5 flex items-center gap-4">
                    <div className={`p-2.5 rounded-lg bg-muted ${color}`}>
                        <Icon className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">{label}</p>
                        <p className="text-2xl font-semibold">{value}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

// ─── Columns ──────────────────────────────────────────────────────────────────

function buildColumns(
    onDelete: (id: string) => void
): ColumnDef<Article>[] {
    return [
        {
            id: "article",
            header: "Article",
            cell: ({ row }) => {
                const article = row.original;
                return (
                    <div className="flex items-center gap-3 min-w-0">
                        {/* Cover image */}
                        <div className="shrink-0 w-[72px] h-[48px] rounded-md overflow-hidden bg-muted border">
                            {article.coverImage ? (
                                <Image
                                    src={article.coverImage}
                                    alt={article.title}
                                    width={72}
                                    height={48}
                                    className="object-cover w-full h-full"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                    <Newspaper className="w-5 h-5" />
                                </div>
                            )}
                        </div>
                        {/* Title */}
                        <span className="font-medium text-sm leading-snug line-clamp-2 min-w-0">
                            {article.title}
                        </span>
                    </div>
                );
            },
        },
        {
            accessorKey: "author",
            header: "Auteur",
            cell: ({ row }) => {
                const { name, avatar } = row.original.author;
                return (
                    <div className="flex items-center gap-2 whitespace-nowrap">
                        <Avatar className="w-7 h-7">
                            {avatar && <AvatarImage src={avatar} alt={name} />}
                            <AvatarFallback className="text-xs">{getInitials(name)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{name}</span>
                    </div>
                );
            },
        },
        {
            accessorKey: "status",
            header: "Statut",
            cell: ({ row }) => {
                const { label, variant } = STATUS_CONFIG[row.original.status];
                return <Badge variant={variant}>{label}</Badge>;
            },
            filterFn: (row, _id, value) => {
                if (value === "all") return true;
                return row.original.status === value;
            },
        },
        {
            id: "date",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    size="sm"
                    className="-ml-3"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Date
                    <ArrowUpDown className="ml-1.5 w-3.5 h-3.5" />
                </Button>
            ),
            accessorFn: (row) => row.publishedAt ?? row.createdAt,
            cell: ({ row }) => {
                const date = row.original.publishedAt ?? row.original.createdAt;
                return (
                    <span className="text-sm text-muted-foreground whitespace-nowrap">
                        {format(date, "d MMM yyyy", { locale: fr })}
                    </span>
                );
            },
            sortingFn: (a, b) => {
                const da = (a.original.publishedAt ?? a.original.createdAt).getTime();
                const db = (b.original.publishedAt ?? b.original.createdAt).getTime();
                return da - db;
            },
        },
        {
            accessorKey: "views",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    size="sm"
                    className="-ml-3"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Vues
                    <ArrowUpDown className="ml-1.5 w-3.5 h-3.5" />
                </Button>
            ),
            cell: ({ row }) => (
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Eye className="w-3.5 h-3.5" />
                    {formatNumber(row.original.views)}
                </div>
            ),
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const article = row.original;
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="w-4 h-4" />
                                <span className="sr-only">Actions</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                                <Link href={`/admin/articles/${article.id}/edit`}>
                                    <Pencil className="w-4 h-4 mr-2" />
                                    Modifier
                                </Link>
                            </DropdownMenuItem>
                            {article.status === "published" && (
                                <DropdownMenuItem asChild>
                                    <Link href={`/blog/${article.id}`} target="_blank">
                                        <Eye className="w-4 h-4 mr-2" />
                                        Voir en ligne
                                    </Link>
                                </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className="text-destructive focus:text-destructive"
                                onClick={() => onDelete(article.id)}
                            >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Supprimer
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function ArticlesPage() {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [globalFilter, setGlobalFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [deleteId, setDeleteId] = useState<string | null>(null);



    const query = useQuery({ queryKey: ['articles'], queryFn: getArticlesService })

    console.log(query.data ?? "No data");


    const handleDelete = (id: string) => setDeleteId(id);

    const confirmDelete = () => {
        if (deleteId) {

        }
    };

    const columns = buildColumns(handleDelete);

    const table = useReactTable({
        data: query?.data ?? [],
        columns,
        state: { sorting, columnFilters, columnVisibility, globalFilter },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: { pagination: { pageSize: 10 } },
    });

    // Apply status filter manually
    const filteredRows = table
        .getFilteredRowModel()
        .rows.filter((row) =>
            statusFilter === "all" ? true : row.original.status === statusFilter
        );

    return (
        <>
            <div className="space-y-6 w-full px-10 py-10">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">Articles</h1>
                        <p className="text-sm text-muted-foreground mt-0.5">
                            {query.data?.length} article{query.data?.length > 1 ? "s" : ""} au total
                        </p>
                    </div>
                    <Button asChild>
                        <Link href="/admin/articles/new">
                            <Plus className="w-4 h-4 mr-2" />
                            Nouvel article
                        </Link>
                    </Button>
                </div>

                {/* Stats */}
                <StatsCards articles={query.data ?? []} />

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Rechercher un article…"
                            value={globalFilter}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            className="pl-9"
                        />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-full sm:w-[160px]">
                            <SelectValue placeholder="Tous les statuts" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tous les statuts</SelectItem>
                            <SelectItem value="published">Publié</SelectItem>
                            <SelectItem value="draft">Brouillon</SelectItem>
                            <SelectItem value="archived">Archivé</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Table */}
                <div className="rounded-xl border bg-card overflow-hidden">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((hg) => (
                                <TableRow key={hg.id} className="bg-muted/50 hover:bg-muted/50">
                                    {hg.headers.map((header) => (
                                        <TableHead key={header.id} className="text-xs uppercase tracking-wide">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {filteredRows.length ? (
                                filteredRows.map((row) => (
                                    <TableRow key={row.id} className="hover:bg-muted/30 transition-colors">
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="text-center py-16 text-muted-foreground">
                                        <Newspaper className="w-10 h-10 mx-auto mb-3 opacity-30" />
                                        <p>Aucun article trouvé</p>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>
                        Page {table.getState().pagination.pageIndex + 1} sur{" "}
                        {Math.max(table.getPageCount(), 1)}
                    </span>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            Précédent
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            Suivant
                        </Button>
                    </div>
                </div>
            </div>

            {/* Delete confirmation dialog */}
            <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Supprimer l'article ?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Cette action est irréversible. L'article sera définitivement supprimé.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={confirmDelete}
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