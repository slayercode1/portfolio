import { NextResponse } from "next/server"
import { getScrollLogos } from "@/lib/db/queries"


export const revalidate = 60

export async function GET() {
  try {
    const logos = await getScrollLogos()

    return NextResponse.json(logos)
  } catch (error) {
    console.error("Error fetching scroll logos:", error instanceof Error ? error.message : "Unknown error")
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
