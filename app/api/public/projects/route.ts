import { NextResponse } from "next/server"
import { getProjects } from "@/lib/db/queries"


export const revalidate = 60

export async function GET() {
  try {
    const projects = await getProjects()

    return NextResponse.json(projects)
  } catch (error) {
    console.error("Error fetching projects:", error instanceof Error ? error.message : "Unknown error")
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
