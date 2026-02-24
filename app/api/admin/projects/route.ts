import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { getSession } from "@/lib/auth/server"
import { projectSchema } from "@/lib/validations"
import { z } from "zod"

export async function GET() {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const projects = await prisma.project.findMany({
      orderBy: { order: "asc" },
    })

    return NextResponse.json(projects)
  } catch (error) {
    console.error("Error fetching projects:", error instanceof Error ? error.message : "Unknown error")
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const [session, body, projectCount] = await Promise.all([
      getSession(),
      request.json(),
      prisma.project.count(),
    ])

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const validated = projectSchema.parse(body)

    const project = await prisma.project.create({
      data: {
        ...validated,
        order: projectCount,
        isPublished: validated.isPublished ?? true,
        hasLiveUrl: validated.hasLiveUrl ?? false,
      },
    })

    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error("Error creating project:", error instanceof Error ? error.message : "Unknown error")
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
