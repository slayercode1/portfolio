import { NextRequest, NextResponse } from "next/server"
import { getServices } from "@/lib/db/queries"
import { parseLocale } from "@/lib/validations"


export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const locale = parseLocale(searchParams.get("locale"))

    const services = await getServices(locale)

    return NextResponse.json(services)
  } catch (error) {
    console.error("Error fetching services:", error instanceof Error ? error.message : "Unknown error")
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
