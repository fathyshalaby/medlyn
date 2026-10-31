import { llmsFullText } from "@/lib/llms-text";

export function GET() {
  return new Response(llmsFullText(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
