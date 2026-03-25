import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { nextCookies } from "better-auth/next-js"
import { prisma } from "@/lib/db"

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    sendResetPassword: async () => {
      // No-op: single admin account, no password reset via email
    },
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // Update session every day
    cookieCache: {
      enabled: false, // Disabled for immediate session revocation
    },
  },

  rateLimit: {
    window: 60,
    max: 100,
  },

  trustedOrigins: [process.env.BETTER_AUTH_URL || "http://localhost:3000"],

  plugins: [nextCookies()],
})

export type Session = typeof auth.$Infer.Session
