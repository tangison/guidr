/**
 * Server bootstrap. On serverless runtimes (Vercel) the SQLite catalogue is
 * bundled read-only with the deployment, so it is copied to the writable
 * /tmp directory once per instance before Prisma touches it. Locally the
 * absolute DATABASE_URL path is used directly and no copy happens.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
  const url = process.env.DATABASE_URL ?? "";
  if (!url.startsWith("file:/tmp/")) return;

  const fs = await import("node:fs");
  const path = await import("node:path");
  const target = url.replace("file:", "");
  if (fs.existsSync(target)) return;

  const source = path.join(process.cwd(), "db", "custom.db");
  if (fs.existsSync(source)) {
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(source, target);
  }
}
