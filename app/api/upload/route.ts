import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const MAX_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

function sanitizeFilename(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9.\-_]/g, "-")
    .replace(/-+/g, "-");
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "Aucun fichier reçu" },
        { status: 400 },
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          error:
            "Type de fichier non autorisé. Formats acceptés : JPG, PNG, WebP, GIF",
        },
        { status: 415 },
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "Fichier trop volumineux. Maximum 5 Mo." },
        { status: 413 },
      );
    }

    // Créer le dossier s'il n'existe pas
    if (!existsSync(UPLOAD_DIR)) {
      await mkdir(UPLOAD_DIR, { recursive: true });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Nom unique : timestamp + nom nettoyé
    const ext = path.extname(file.name) || ".jpg";
    const baseName = path.basename(file.name, ext);
    const uniqueName = `${Date.now()}-${sanitizeFilename(baseName)}${ext}`;
    const filePath = path.join(UPLOAD_DIR, uniqueName);

    await writeFile(filePath, buffer);

    const url = `/uploads/${uniqueName}`;
    return NextResponse.json({ url }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/upload]", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
