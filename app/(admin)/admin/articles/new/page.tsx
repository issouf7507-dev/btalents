"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TiptapImage from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import slugify from "slugify";
import { useMutation, useQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { ImageUploader } from "@/components/image-uploader";
import { toast } from "sonner";
import {
    Bold,
    Italic,
    UnderlineIcon,
    Strikethrough,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    List,
    ListOrdered,
    Quote,
    Code2,
    ImageIcon,
    Link as LinkIcon,
    Undo2,
    Redo2,
    Heading1,
    Heading2,
    Heading3,
    ArrowLeft,
    Save,
    Eye,
    Globe,
    Loader2,
    Upload,
} from "lucide-react";
import { createArticleService, CreateArticleDTO } from "@/lib/api/articles/services";
import { getCategoriesService } from "@/lib/api/categories/services";
import { useSession } from "@/lib/auth-client";

// ─── Types ────────────────────────────────────────────────────────────────────

type ArticleStatus = "draft" | "published" | "archived";

interface Category {
    id: string;
    name: string;
    slug: string;
}

interface ArticleFormData {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    coverImage: string;
    status: ArticleStatus;
    categoryId: string;
    tags: string[];
    metaTitle: string;
    metaDescription: string;
}

const queryClient = new QueryClient();

// ─── Toolbar button ───────────────────────────────────────────────────────────

function ToolbarBtn({
    label,
    active,
    disabled,
    onClick,
    children,
}: {
    label: string;
    active?: boolean;
    disabled?: boolean;
    onClick: () => void;
    children: React.ReactNode;
}) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <button
                    type="button"
                    onClick={onClick}
                    disabled={disabled}
                    className={[
                        "p-1.5 rounded-md transition-colors",
                        active ? "bg-foreground text-background" : "hover:bg-muted text-foreground",
                        disabled ? "opacity-40 cursor-not-allowed" : "",
                    ].join(" ")}
                >
                    {children}
                    <span className="sr-only">{label}</span>
                </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs">{label}</TooltipContent>
        </Tooltip>
    );
}

// ─── Tiptap toolbar ───────────────────────────────────────────────────────────

function EditorToolbar({ editor }: { editor: ReturnType<typeof useEditor> }) {
    if (!editor) return null;

    const imageInputRef = useRef<HTMLInputElement>(null);

    // Upload image dans le contenu
    const handleImageUpload = async (file: File) => {
        const fd = new FormData();
        fd.append("file", file);
        const res = await fetch("/api/upload", { method: "POST", body: fd });
        const data = await res.json();
        if (!res.ok) { toast.error(data.error ?? "Erreur upload"); return; }
        editor.chain().focus().setImage({ src: data.url }).run();
        toast.success("Image insérée !");
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleImageUpload(file);
        e.target.value = "";
    };

    // Insérer image par URL
    const addImageByUrl = () => {
        const url = window.prompt("URL de l'image");
        if (url) editor.chain().focus().setImage({ src: url }).run();
    };

    const setLink = () => {
        const prev = editor.getAttributes("link").href;
        const url = window.prompt("URL du lien", prev);
        if (url === null) return;
        if (url === "") {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();
            return;
        }
        editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    };

    return (
        <TooltipProvider delayDuration={300}>
            <div className="flex flex-wrap items-center gap-0.5 px-3 py-2 border-b bg-muted/40">
                {/* History */}
                <ToolbarBtn label="Annuler" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>
                    <Undo2 className="w-4 h-4" />
                </ToolbarBtn>
                <ToolbarBtn label="Rétablir" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>
                    <Redo2 className="w-4 h-4" />
                </ToolbarBtn>

                <Separator orientation="vertical" className="mx-1 h-5" />

                {/* Headings */}
                <ToolbarBtn label="Titre 1" active={editor.isActive("heading", { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
                    <Heading1 className="w-4 h-4" />
                </ToolbarBtn>
                <ToolbarBtn label="Titre 2" active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
                    <Heading2 className="w-4 h-4" />
                </ToolbarBtn>
                <ToolbarBtn label="Titre 3" active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
                    <Heading3 className="w-4 h-4" />
                </ToolbarBtn>

                <Separator orientation="vertical" className="mx-1 h-5" />

                {/* Marks */}
                <ToolbarBtn label="Gras" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>
                    <Bold className="w-4 h-4" />
                </ToolbarBtn>
                <ToolbarBtn label="Italique" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}>
                    <Italic className="w-4 h-4" />
                </ToolbarBtn>
                <ToolbarBtn label="Souligné" active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()}>
                    <UnderlineIcon className="w-4 h-4" />
                </ToolbarBtn>
                <ToolbarBtn label="Barré" active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()}>
                    <Strikethrough className="w-4 h-4" />
                </ToolbarBtn>
                <ToolbarBtn label="Code" active={editor.isActive("code")} onClick={() => editor.chain().focus().toggleCode().run()}>
                    <Code2 className="w-4 h-4" />
                </ToolbarBtn>

                <Separator orientation="vertical" className="mx-1 h-5" />

                {/* Alignment */}
                <ToolbarBtn label="Gauche" active={editor.isActive({ textAlign: "left" })} onClick={() => editor.chain().focus().setTextAlign("left").run()}>
                    <AlignLeft className="w-4 h-4" />
                </ToolbarBtn>
                <ToolbarBtn label="Centre" active={editor.isActive({ textAlign: "center" })} onClick={() => editor.chain().focus().setTextAlign("center").run()}>
                    <AlignCenter className="w-4 h-4" />
                </ToolbarBtn>
                <ToolbarBtn label="Droite" active={editor.isActive({ textAlign: "right" })} onClick={() => editor.chain().focus().setTextAlign("right").run()}>
                    <AlignRight className="w-4 h-4" />
                </ToolbarBtn>
                <ToolbarBtn label="Justifié" active={editor.isActive({ textAlign: "justify" })} onClick={() => editor.chain().focus().setTextAlign("justify").run()}>
                    <AlignJustify className="w-4 h-4" />
                </ToolbarBtn>

                <Separator orientation="vertical" className="mx-1 h-5" />

                {/* Lists */}
                <ToolbarBtn label="Liste à puces" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>
                    <List className="w-4 h-4" />
                </ToolbarBtn>
                <ToolbarBtn label="Liste numérotée" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
                    <ListOrdered className="w-4 h-4" />
                </ToolbarBtn>
                <ToolbarBtn label="Citation" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
                    <Quote className="w-4 h-4" />
                </ToolbarBtn>

                <Separator orientation="vertical" className="mx-1 h-5" />

                {/* Lien */}
                <ToolbarBtn label="Insérer un lien" active={editor.isActive("link")} onClick={setLink}>
                    <LinkIcon className="w-4 h-4" />
                </ToolbarBtn>

                {/* Image — upload fichier */}
                <ToolbarBtn label="Uploader une image" onClick={() => imageInputRef.current?.click()}>
                    <Upload className="w-4 h-4" />
                </ToolbarBtn>

                {/* Image — par URL */}
                <ToolbarBtn label="Image par URL" onClick={addImageByUrl}>
                    <ImageIcon className="w-4 h-4" />
                </ToolbarBtn>

                {/* Input file caché */}
                <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    className="hidden"
                    onChange={handleImageChange}
                />
            </div>
        </TooltipProvider>
    );
}

// ─── Tag input ────────────────────────────────────────────────────────────────

function TagInput({ tags, onChange }: { tags: string[]; onChange: (tags: string[]) => void }) {
    const [input, setInput] = useState("");
    const addTag = () => {
        const val = input.trim().toLowerCase();
        if (val && !tags.includes(val)) onChange([...tags, val]);
        setInput("");
    };
    return (
        <div className="space-y-2">
            <div className="flex gap-2">
                <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addTag(); } }}
                    placeholder="Ajouter un tag, puis Entrée"
                />
                <Button type="button" variant="outline" onClick={addTag}>+</Button>
            </div>
            {tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                    {tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="gap-1 cursor-pointer" onClick={() => onChange(tags.filter((t) => t !== tag))}>
                            {tag} ×
                        </Badge>
                    ))}
                </div>
            )}
        </div>
    );
}

// ─── Main component ───────────────────────────────────────────────────────────

function ArticleEditorPageContent() {
    const router = useRouter();
    const { data: session } = useSession();
    const [autoSlug, setAutoSlug] = useState(true);

    const [form, setForm] = useState<ArticleFormData>({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        coverImage: "",
        status: "draft",
        categoryId: "",
        tags: [],
        metaTitle: "",
        metaDescription: "",
    });

    const set = useCallback(
        <K extends keyof ArticleFormData>(key: K, value: ArticleFormData[K]) =>
            setForm((prev) => ({ ...prev, [key]: value })),
        []
    );

    // Fetch categories
    const { data: categories = [], isLoading: loadingCategories } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategoriesService,
    });

    // Create article mutation
    const createArticleMutation = useMutation({
        mutationFn: createArticleService,
        onSuccess: (data) => {
            toast.success("Article créé !");
            router.push("/admin/articles");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Une erreur est survenue.");
        },
    });

    useEffect(() => {
        if (autoSlug && form.title) {
            set("slug", slugify(form.title, { lower: true, strict: true, locale: "fr" }));
        }
    }, [form.title, autoSlug, set]);

    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit,
            Underline,
            TiptapImage,
            Link.configure({ openOnClick: false }),
            TextAlign.configure({ types: ["heading", "paragraph"] }),
            Placeholder.configure({ placeholder: "Rédigez votre article ici…" }),
            CharacterCount.configure({ limit: 50000 }),
        ],
        content: form.content,
        onUpdate: ({ editor }) => set("content", editor.getHTML()),
        editorProps: {
            attributes: {
                class: "prose prose-sm sm:prose-base dark:prose-invert max-w-none focus:outline-none min-h-[400px] p-4",
            },
        },
    });

    const charCount = editor?.storage.characterCount.characters() ?? 0;
    const wordCount = editor?.storage.characterCount.words() ?? 0;

    const handleSave = (status?: ArticleStatus) => {
        if (!form.title.trim()) {
            toast.error("Le titre est obligatoire.");
            return;
        }

        if (!form.content.trim()) {
            toast.error("Le contenu est obligatoire.");
            return;
        }

        if (!session?.user?.id) {
            toast.error("Vous devez être connecté.");
            return;
        }

        const payload: CreateArticleDTO = {
            title: form.title,
            slug: form.slug,
            excerpt: form.excerpt,
            content: form.content,
            coverImage: form.coverImage,
            status: status ?? form.status,
            categoryId: form.categoryId || undefined,
            metaTitle: form.metaTitle,
            metaDescription: form.metaDescription,
            tags: form.tags,
        };

        createArticleMutation.mutate(payload);
    };

    const isSaving = createArticleMutation.isPending;

    return (
        <div className="w-full px-10 py-10 space-y-6">
            {/* Top bar */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon" onClick={() => router.push("/admin/articles")}>
                        <ArrowLeft className="w-4 h-4" />
                    </Button>
                    <div>
                        <h1 className="text-xl font-semibold">Nouvel article</h1>
                        <p className="text-xs text-muted-foreground">
                            {wordCount} mots · {charCount} caractères
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Select value={form.status} onValueChange={(v) => set("status", v as ArticleStatus)}>
                        <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="draft">Brouillon</SelectItem>
                            <SelectItem value="published">Publié</SelectItem>
                            <SelectItem value="archived">Archivé</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline" onClick={() => handleSave("draft")} disabled={isSaving}>
                        {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                        Brouillon
                    </Button>
                    <Button onClick={() => handleSave("published")} disabled={isSaving}>
                        {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Globe className="w-4 h-4 mr-2" />}
                        Publier
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* ── Left ───────────────────────────────────────────────────── */}
                <div className="lg:col-span-2 space-y-5">
                    {/* Title */}
                    <div className="space-y-1.5">
                        <Label htmlFor="title">Titre *</Label>
                        <Input
                            id="title"
                            placeholder="Un titre accrocheur…"
                            value={form.title}
                            onChange={(e) => set("title", e.target.value)}
                            className="text-lg font-medium h-12"
                        />
                    </div>

                    {/* Slug */}
                    <div className="space-y-1.5">
                        <Label htmlFor="slug">Slug</Label>
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm select-none">/blog/</span>
                                <Input
                                    id="slug"
                                    value={form.slug}
                                    onChange={(e) => { setAutoSlug(false); set("slug", e.target.value); }}
                                    className="pl-12 font-mono text-sm"
                                />
                            </div>
                            {!autoSlug && (
                                <Button type="button" variant="outline" size="sm" onClick={() => {
                                    setAutoSlug(true);
                                    set("slug", slugify(form.title, { lower: true, strict: true, locale: "fr" }));
                                }}>
                                    Regénérer
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Excerpt */}
                    <div className="space-y-1.5">
                        <Label htmlFor="excerpt">Extrait</Label>
                        <Textarea
                            id="excerpt"
                            placeholder="Courte description affichée dans les listes d'articles…"
                            value={form.excerpt}
                            onChange={(e) => set("excerpt", e.target.value)}
                            rows={3}
                        />
                        <p className="text-xs text-muted-foreground">{form.excerpt.length}/200 caractères recommandés</p>
                    </div>

                    {/* Rich text editor */}
                    <div className="space-y-1.5">
                        <Label>Contenu</Label>
                        <div className="border rounded-xl overflow-hidden bg-background">
                            {editor && <EditorToolbar editor={editor} />}
                            <EditorContent editor={editor} />
                            <div className="flex justify-end px-4 py-1.5 border-t bg-muted/20">
                                <span className="text-xs text-muted-foreground">{wordCount} mots</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Right: sidebar ──────────────────────────────────────────── */}
                <div className="space-y-5">
                    {/* Cover image — avec upload */}
                    <div className="bg-card border rounded-xl p-4 space-y-3">
                        <h3 className="font-medium text-sm">Image de couverture</h3>
                        <ImageUploader
                            value={form.coverImage}
                            onChange={(url) => set("coverImage", url)}
                            showUrlInput
                        />
                    </div>

                    {/* Catégorie */}
                    <div className="bg-card border rounded-xl p-4 space-y-3">
                        <h3 className="font-medium text-sm">Catégorie</h3>
                        <Select value={form.categoryId} onValueChange={(v) => set("categoryId", v)} disabled={loadingCategories}>
                            <SelectTrigger>
                                <SelectValue placeholder="Choisir une catégorie…" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.length === 0 ? (
                                    <div className="px-3 py-4 text-sm text-muted-foreground text-center">
                                        Aucune catégorie disponible.<br />
                                        <a href="/dashboard/categories" className="underline text-primary">En créer une →</a>
                                    </div>
                                ) : (
                                    categories.map((cat: Category) => (
                                        <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                                    ))
                                )}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Tags */}
                    <div className="bg-card border rounded-xl p-4 space-y-3">
                        <h3 className="font-medium text-sm">Tags</h3>
                        <TagInput tags={form.tags} onChange={(t) => set("tags", t)} />
                    </div>

                    {/* SEO */}
                    <div className="bg-card border rounded-xl p-4 space-y-4">
                        <h3 className="font-medium text-sm">SEO</h3>
                        <div className="space-y-1.5">
                            <Label htmlFor="metaTitle" className="text-xs">Meta title</Label>
                            <Input
                                id="metaTitle"
                                placeholder={form.title || "Meta title"}
                                value={form.metaTitle}
                                onChange={(e) => set("metaTitle", e.target.value)}
                                className="text-sm"
                            />
                            <p className="text-xs text-muted-foreground">{(form.metaTitle || form.title).length}/60</p>
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="metaDescription" className="text-xs">Meta description</Label>
                            <Textarea
                                id="metaDescription"
                                placeholder={form.excerpt || "Meta description"}
                                value={form.metaDescription}
                                onChange={(e) => set("metaDescription", e.target.value)}
                                rows={3}
                                className="text-sm resize-none"
                            />
                            <p className="text-xs text-muted-foreground">{(form.metaDescription || form.excerpt).length}/160</p>
                        </div>
                        {/* SERP preview */}
                        <div className="rounded-lg border bg-muted/30 p-3 space-y-0.5">
                            <p className="text-xs text-muted-foreground mb-1.5">Aperçu Google</p>
                            <p className="text-[15px] text-blue-600 font-medium leading-tight line-clamp-1">
                                {form.metaTitle || form.title || "Titre de l'article"}
                            </p>
                            <p className="text-xs text-green-700">
                                votresite.fr/blog/{form.slug || "slug-de-larticle"}
                            </p>
                            <p className="text-xs text-muted-foreground line-clamp-2">
                                {form.metaDescription || form.excerpt || "Description de l'article…"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ArticleEditorPage() {
    return (
        <QueryClientProvider client={queryClient}>
            <ArticleEditorPageContent />
        </QueryClientProvider>
    );
}