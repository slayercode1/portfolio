import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { getSession } from "@/lib/auth/server"
import { serviceSchema } from "@/lib/validations"
import { z } from "zod"

export async function GET() {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const services = await prisma.service.findMany({
      orderBy: { order: "asc" },
    })
    return NextResponse.json(services)
  } catch (error) {
    console.error("Error fetching services:", error instanceof Error ? error.message : "Unknown error")
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const validated = serviceSchema.parse(body)

    const service = await prisma.service.create({
      data: {
        key: validated.key,
        locale: validated.locale,
        title: validated.title,
        description: validated.description,
        badgeText: validated.badgeText,
        order: validated.order ?? 0,
        isActive: validated.isActive ?? true,
      },
    })

    return NextResponse.json(service)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error("Error saving service:", error instanceof Error ? error.message : "Unknown error")
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
