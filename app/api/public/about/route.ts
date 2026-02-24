import { NextRequest, NextResponse } from "next/server"
import { getAboutSection, getTechnologies } from "@/lib/db/queries"
import { parseLocale } from "@/lib/validations"


export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const locale = parseLocale(searchParams.get("locale"))

    const [about, technologies] = await Promise.all([
      getAboutSection(locale),
      getTechnologies(),
    ])

    if (!about) {
      return NextResponse.json({ error: "About section not found" }, { status: 404 })
    }

    return NextResponse.json({ ...about, technologies })
  } catch (error) {
    console.error("Error fetching about:", error instanceof Error ? error.message : "Unknown error")
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
