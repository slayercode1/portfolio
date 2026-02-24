import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { getSession } from "@/lib/auth/server"
import { aboutSchema } from "@/lib/validations"
import { z } from "zod"

export async function GET() {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const aboutSections = await prisma.aboutSection.findMany({
      include: { certifications: true },
    })
    return NextResponse.json(aboutSections)
  } catch (error) {
    console.error("Error fetching about sections:", error instanceof Error ? error.message : "Unknown error")
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
    const validated = aboutSchema.parse(body)

    const { locale, certifications, ...data } = validated

    // Upsert the about section
    const aboutSection = await prisma.aboutSection.upsert({
      where: { locale },
      update: data,
      create: { locale, ...data },
    })

    // Handle certifications if provided
    if (certifications !== undefined) {
      // Delete existing certifications for this about section
      await prisma.certification.deleteMany({
        where: { aboutSectionId: aboutSection.id },
      })

      // Create new certifications
      if (certifications.length > 0) {
        await prisma.certification.createMany({
          data: certifications.map((cert, index) => ({
            key: cert.key || `cert-${index}`,
            title: cert.title,
            locale,
            aboutSectionId: aboutSection.id,
          })),
        })
      }
    }

    // Fetch and return the updated about section with certifications
    const updatedSection = await prisma.aboutSection.findUnique({
      where: { locale },
      include: { certifications: true },
    })

    return NextResponse.json(updatedSection)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error("Error saving about section:", error instanceof Error ? error.message : "Unknown error")
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
