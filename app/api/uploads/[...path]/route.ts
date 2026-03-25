import { NextRequest, NextResponse } from "next/server"
import { readFile, stat } from "node:fs/promises"
import { join } from "node:path"

const UPLOAD_DIR = join(process.cwd(), "uploads")
const MIME_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params

  // Only allow single filename, no subdirectories
  if (path.length !== 1 || path[0].includes("..")) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  const filename = path[0]
  // Validate filename format: UUID + extension only
  if (!/^[a-f0-9-]+\.\w+$/.test(filename)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  const filePath = join(UPLOAD_DIR, filename)

  try {
    await stat(filePath)
    const buffer = await readFile(filePath)
    const ext = "." + filename.split(".").pop()
    const contentType = MIME_TYPES[ext] || "application/octet-stream"

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    })
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }
}
