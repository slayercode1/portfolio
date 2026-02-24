import { NextRequest, NextResponse } from "next/server"
import { getHeroSection } from "@/lib/db/queries"
import { parseLocale } from "@/lib/validations"


export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const locale = parseLocale(searchParams.get("locale"))

    const hero = await getHeroSection(locale)

    if (!hero) {
      return NextResponse.json({ error: "Hero section not found" }, { status: 404 })
    }

    return NextResponse.json(hero)
  } catch (error) {
    console.error("Error fetching hero:", error instanceof Error ? error.message : "Unknown error")
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
