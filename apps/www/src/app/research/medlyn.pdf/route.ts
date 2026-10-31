import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

function paperFile(): string | null {
  const fromModule = fileURLToPath(new URL("../../../../../../paper/main.pdf", import.meta.url));
  const candidates = [
    fromModule,
    path.resolve(process.cwd(), "paper/main.pdf"),
    path.resolve(process.cwd(), "../../paper/main.pdf"),
  ];
  return candidates.find((candidate) => existsSync(candidate)) ?? null;
}

export async function GET() {
  const file = paperFile();
  if (!file) return new Response("Paper not found", { status: 404 });
  const bytes = await readFile(file);
  return new Response(new Uint8Array(bytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'inline; filename="medlyn.pdf"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
