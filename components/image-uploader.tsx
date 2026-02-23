"use client";

// components/image-uploader.tsx

import { useCallback, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Upload, X, Loader2, ImageIcon, Link as LinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploaderProps {
    value: string;
    onChange: (url: string) => void;
    /** Afficher le champ URL en plus du drag & drop */
    showUrlInput?: boolean;
    className?: string;
}

export function ImageUploader({
    value,
    onChange,
    showUrlInput = true,
    className,
}: ImageUploaderProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [tab, setTab] = useState<"upload" | "url">("upload");
    const [urlInput, setUrlInput] = useState(value.startsWith("http") ? value : "");
    const inputRef = useRef<HTMLInputElement>(null);

    // ── Upload ──────────────────────────────────────────────────────────────────

    const uploadFile = useCallback(
        async (file: File) => {
            setIsUploading(true);
            try {
                const fd = new FormData();
                fd.append("file", file);

                const res = await fetch("/api/upload", { method: "POST", body: fd });
                const data = await res.json();

                if (!res.ok) {
                    toast.error(data.error ?? "Erreur lors de l'upload");
                    return;
                }

                onChange(data.url);
                toast.success("Image uploadée !");
            } catch {
                toast.error("Erreur lors de l'upload");
            } finally {
                setIsUploading(false);
            }
        },
        [onChange]
    );

    // ── Drag & drop ─────────────────────────────────────────────────────────────

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            setIsDragging(false);
            const file = e.dataTransfer.files[0];
            if (file) uploadFile(file);
        },
        [uploadFile]
    );

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => setIsDragging(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) uploadFile(file);
        // Reset pour permettre le re-select du même fichier
        e.target.value = "";
    };

    // ── URL tab ─────────────────────────────────────────────────────────────────

    const applyUrl = () => {
        const url = urlInput.trim();
        if (!url) return;
        onChange(url);
    };

    // ── Remove ──────────────────────────────────────────────────────────────────

    const handleRemove = () => {
        onChange("");
        setUrlInput("");
    };

    // ── Render ──────────────────────────────────────────────────────────────────

    return (
        <div className={cn("space-y-3", className)}>
            {/* Preview */}
            {value ? (
                <div className="relative group aspect-video rounded-lg overflow-hidden border bg-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={value}
                        alt="Couverture"
                        className="w-full h-full object-cover"
                        onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Button
                            type="button"
                            size="sm"
                            variant="secondary"
                            onClick={() => inputRef.current?.click()}
                            disabled={isUploading}
                        >
                            {isUploading ? (
                                <Loader2 className="w-4 h-4 animate-spin mr-1.5" />
                            ) : (
                                <Upload className="w-4 h-4 mr-1.5" />
                            )}
                            Remplacer
                        </Button>
                        <Button
                            type="button"
                            size="sm"
                            variant="destructive"
                            onClick={handleRemove}
                        >
                            <X className="w-4 h-4 mr-1.5" />
                            Supprimer
                        </Button>
                    </div>
                </div>
            ) : (
                <>
                    {/* Tabs upload / URL */}
                    {showUrlInput && (
                        <div className="flex border rounded-lg overflow-hidden text-sm">
                            <button
                                type="button"
                                onClick={() => setTab("upload")}
                                className={cn(
                                    "flex-1 flex items-center justify-center gap-1.5 px-3 py-2 transition-colors",
                                    tab === "upload"
                                        ? "bg-foreground text-background"
                                        : "hover:bg-muted text-muted-foreground"
                                )}
                            >
                                <Upload className="w-3.5 h-3.5" />
                                Upload
                            </button>
                            <button
                                type="button"
                                onClick={() => setTab("url")}
                                className={cn(
                                    "flex-1 flex items-center justify-center gap-1.5 px-3 py-2 transition-colors border-l",
                                    tab === "url"
                                        ? "bg-foreground text-background"
                                        : "hover:bg-muted text-muted-foreground"
                                )}
                            >
                                <LinkIcon className="w-3.5 h-3.5" />
                                URL
                            </button>
                        </div>
                    )}

                    {/* Upload zone */}
                    {tab === "upload" && (
                        <div
                            onClick={() => inputRef.current?.click()}
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            className={cn(
                                "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
                                isDragging
                                    ? "border-primary bg-primary/5"
                                    : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/30"
                            )}
                        >
                            {isUploading ? (
                                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                    <Loader2 className="w-8 h-8 animate-spin" />
                                    <p className="text-sm">Upload en cours…</p>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                    <ImageIcon className="w-8 h-8 opacity-40" />
                                    <p className="text-sm font-medium">
                                        Glissez une image ici ou{" "}
                                        <span className="text-primary underline">parcourez</span>
                                    </p>
                                    <p className="text-xs">JPG, PNG, WebP, GIF — max 5 Mo</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* URL zone */}
                    {tab === "url" && showUrlInput && (
                        <div className="flex gap-2">
                            <Input
                                placeholder="https://example.com/image.jpg"
                                value={urlInput}
                                onChange={(e) => setUrlInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && applyUrl()}
                            />
                            <Button type="button" variant="outline" onClick={applyUrl}>
                                OK
                            </Button>
                        </div>
                    )}
                </>
            )}

            {/* Input file caché */}
            <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="hidden"
                onChange={handleFileChange}
            />
        </div>
    );
}