import { cache } from "react"
import { prisma } from "@/lib/db"

export const getHeroSection = cache(async (locale: string = "fr") => {
  return prisma.heroSection.findUnique({
    where: { locale },
  })
})

export const getAboutSection = cache(async (locale: string = "fr") => {
  return prisma.aboutSection.findUnique({
    where: { locale },
    include: {
      certifications: true,
    },
  })
})

export const getTechnologies = cache(async () => {
  return prisma.technology.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  })
})

export const getScrollLogos = cache(async () => {
  return prisma.scrollLogo.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  })
})

export const getProjects = cache(async () => {
  return prisma.project.findMany({
    where: { isPublished: true },
    orderBy: { order: "asc" },
  })
})

export const getServices = cache(async (locale: string = "fr") => {
  return prisma.service.findMany({
    where: { locale, isActive: true },
    orderBy: { order: "asc" },
  })
})

export const getSocialLinks = cache(async () => {
  return prisma.socialLink.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  })
})

export const getContactSection = cache(async (locale: string = "fr") => {
  return prisma.contactSection.findUnique({
    where: { locale },
    include: {
      benefits: { orderBy: { order: "asc" } },
      stats: { orderBy: { order: "asc" } },
      techLogos: { orderBy: { order: "asc" } },
    },
  })
})
