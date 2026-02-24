import { z } from "zod"

const VALID_LOCALES = ["fr", "en"] as const
export type ValidLocale = typeof VALID_LOCALES[number]

export const localeSchema = z.enum(VALID_LOCALES)

export function parseLocale(raw: string | null): ValidLocale {
  const result = localeSchema.safeParse(raw)
  return result.success ? result.data : "fr"
}

/** Reject javascript: data: blob: etc. Only allow http(s) and relative paths */
const safeUrlSchema = z.string().max(2000).refine(
  (url) => url === "" || /^(https?:\/\/|\/(?!\/))/i.test(url),
  { message: "URL must use https://, http://, or be a relative path" }
)

export const projectSchema = z.object({
  title: z.string().min(1).max(200),
  subtitle: z.string().min(1).max(500),
  description: z.string().min(1).max(5000),
  image: safeUrlSchema,
  technologies: z.array(z.string().max(100)).max(50),
  category: z.enum(["web", "mobile", "desktop"]),
  websiteUrl: safeUrlSchema.optional(),
  hasLiveUrl: z.boolean().optional(),
  isPublished: z.boolean().optional(),
  order: z.number().int().min(0).optional(),
}).strict()

export const projectUpdateSchema = projectSchema.partial().strict()

export const heroSchema = z.object({
  locale: localeSchema,
  greeting: z.string().min(1).max(200),
  name: z.string().min(1).max(200),
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(2000),
  cvUrl: safeUrlSchema.optional(),
  heroImage: safeUrlSchema.optional(),
  projectsCount: z.number().int().min(0).max(9999).optional(),
  experienceYears: z.number().int().min(0).max(100).optional(),
  technologiesCount: z.number().int().min(0).max(9999).optional(),
  ctaProjects: z.string().max(200).optional(),
  ctaCv: z.string().max(200).optional(),
  statsProjects: z.string().max(200).optional(),
  statsExperience: z.string().max(200).optional(),
  statsTechnologies: z.string().max(200).optional(),
}).strict()

export const aboutSchema = z.object({
  locale: localeSchema,
  badge: z.string().min(1).max(200),
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(5000),
  bio: z.string().min(1).max(10000),
  profileImage: safeUrlSchema.optional(),
  stackTitle: z.string().min(1).max(200),
  certificationsTitle: z.string().min(1).max(200),
  certifications: z.array(z.object({
    key: z.string().max(200).optional(),
    title: z.string().max(500),
  })).max(50).optional(),
}).strict()

export const technologySchema = z.object({
  name: z.string().min(1).max(100),
  icon: safeUrlSchema,

  order: z.number().int().min(0).optional(),
  isActive: z.boolean().optional(),
}).strict()

export const technologyUpdateSchema = technologySchema.partial().strict()

export const socialSchema = z.object({
  name: z.string().min(1).max(100),
  url: safeUrlSchema,
  icon: z.string().min(1).max(100),
  order: z.number().int().min(0).optional(),
  isActive: z.boolean().optional(),
}).strict()

export const socialUpdateSchema = socialSchema.partial().strict()

export const serviceSchema = z.object({
  key: z.string().min(1).max(100),
  locale: localeSchema,
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(2000),
  badgeText: z.string().min(1).max(100),
  order: z.number().int().min(0).optional(),
  isActive: z.boolean().optional(),
}).strict()

export const serviceUpdateSchema = serviceSchema.partial().strict()

export const settingsSchema = z.object({
  siteName: z.string().max(200).optional(),
  siteUrl: safeUrlSchema.optional(),
  siteDescription: z.string().max(2000).optional(),
  logoUrl: safeUrlSchema.optional(),
  faviconUrl: safeUrlSchema.optional(),
  metaTitle: z.string().max(200).optional(),
  metaDescription: z.string().max(2000).optional(),
}).strict()

export const contactSectionSchema = z.object({
  locale: localeSchema,
  badge: z.string().min(1).max(200),
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(5000),
  socialsTitle: z.string().min(1).max(200),
  isFormEnabled: z.boolean().optional(),
  benefits: z.array(z.object({
    text: z.string().max(500),
  })).max(20).optional(),
  stats: z.array(z.object({
    value: z.string().max(100),
    label: z.string().max(200),
  })).max(20).optional(),
  techLogos: z.array(z.object({
    src: safeUrlSchema,
    alt: z.string().max(200),
  })).max(50).optional(),
}).strict()
