import { unlink } from "node:fs/promises"
import { join } from "node:path"

const UPLOAD_DIR = join(process.cwd(), "uploads")

/** Delete an uploaded file if the URL points to a local upload */
export async function deleteUploadedFile(url: string | null | undefined) {
  if (!url || !url.startsWith("/api/uploads/")) return
  const filename = url.replace("/api/uploads/", "")
  if (filename.includes("..") || filename.includes("/")) return
  try {
    await unlink(join(UPLOAD_DIR, filename))
  } catch {
    // File may not exist, ignore
  }
}
