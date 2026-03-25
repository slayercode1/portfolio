import { NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth/server"
import { writeFile, mkdir } from "node:fs/promises"
import { join } from "node:path"
import crypto from "node:crypto"

const UPLOAD_DIR = join(process.cwd(), "uploads")
const MAX_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "image/svg+xml": ".svg",
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "File too large (max 5MB)" }, { status: 400 })
    }

    const ext = ALLOWED_TYPES[file.type]
    if (!ext) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 })
    }

    const filename = `${crypto.randomUUID()}${ext}`
    const buffer = Buffer.from(await file.arrayBuffer())

    await mkdir(UPLOAD_DIR, { recursive: true })
    await writeFile(join(UPLOAD_DIR, filename), buffer)

    return NextResponse.json({ url: `/api/uploads/${filename}` })
  } catch (error) {
    console.error("Upload error:", error instanceof Error ? error.message : error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
