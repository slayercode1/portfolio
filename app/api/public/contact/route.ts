import { NextRequest, NextResponse } from "next/server"
import { getContactSection, getSocialLinks } from "@/lib/db/queries"
import { parseLocale } from "@/lib/validations"


export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const locale = parseLocale(searchParams.get("locale"))

    const [contact, socials] = await Promise.all([
      getContactSection(locale),
      getSocialLinks(),
    ])

    if (!contact) {
      return NextResponse.json({ error: "Contact section not found" }, { status: 404 })
    }

    return NextResponse.json({ ...contact, socials })
  } catch (error) {
    console.error("Error fetching contact:", error instanceof Error ? error.message : "Unknown error")
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
