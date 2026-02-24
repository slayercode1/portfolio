import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { getSession } from "@/lib/auth/server"
import { heroSchema } from "@/lib/validations"
import { z } from "zod"

export async function GET() {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const heroSections = await prisma.heroSection.findMany()
    return NextResponse.json(heroSections)
  } catch (error) {
    console.error("Error fetching hero sections:", error instanceof Error ? error.message : "Unknown error")
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
    const validated = heroSchema.parse(body)

    const { locale, ...data } = validated

    const heroSection = await prisma.heroSection.upsert({
      where: { locale },
      update: data,
      create: { locale, ...data },
    })

    return NextResponse.json(heroSection)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error("Error saving hero section:", error instanceof Error ? error.message : "Unknown error")
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
