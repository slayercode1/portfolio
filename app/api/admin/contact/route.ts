import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { getSession } from "@/lib/auth/server"
import { contactSectionSchema } from "@/lib/validations"
import { z } from "zod"

export async function GET() {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const contactSections = await prisma.contactSection.findMany({
      include: {
        benefits: { orderBy: { order: "asc" } },
        stats: { orderBy: { order: "asc" } },
        techLogos: { orderBy: { order: "asc" } },
      },
    })
    return NextResponse.json(contactSections)
  } catch (error) {
    console.error("Error fetching contact sections:", error instanceof Error ? error.message : "Unknown error")
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
    const validated = contactSectionSchema.parse(body)

    const { locale, benefits, stats, techLogos, ...data } = validated

    // Upsert contact section
    const contactSection = await prisma.contactSection.upsert({
      where: { locale },
      update: data,
      create: { locale, ...data },
    })

    // Delete existing benefits, stats, and tech logos in parallel
    await Promise.all([
      prisma.contactBenefit.deleteMany({ where: { contactSectionId: contactSection.id } }),
      prisma.contactStat.deleteMany({ where: { contactSectionId: contactSection.id } }),
      prisma.contactTechLogo.deleteMany({ where: { contactSectionId: contactSection.id } }),
    ])

    // Create new benefits, stats, and tech logos in parallel
    await Promise.all([
      benefits && benefits.length > 0
        ? prisma.contactBenefit.createMany({
            data: benefits.map((b, index) => ({
              text: b.text,
              order: index,
              contactSectionId: contactSection.id,
            })),
          })
        : Promise.resolve(),
      stats && stats.length > 0
        ? prisma.contactStat.createMany({
            data: stats.map((s, index) => ({
              value: s.value,
              label: s.label,
              order: index,
              contactSectionId: contactSection.id,
            })),
          })
        : Promise.resolve(),
      techLogos && techLogos.length > 0
        ? prisma.contactTechLogo.createMany({
            data: techLogos.map((logo, index) => ({
              src: logo.src,
              alt: logo.alt,
              order: index,
              contactSectionId: contactSection.id,
            })),
          })
        : Promise.resolve(),
    ])

    return NextResponse.json(contactSection)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error("Error saving contact section:", error instanceof Error ? error.message : "Unknown error")
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
