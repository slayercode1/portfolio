import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import pg from 'pg'

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function createAdminUser() {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@portfolio.com'
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin123!'

    const existingUser = await prisma.user.findUnique({
      where: { email: adminEmail },
    })

    if (existingUser) {
      console.log('Admin user already exists:', adminEmail)
      await pool.end()
      return
    }

    const auth = betterAuth({
      database: prismaAdapter(prisma, { provider: 'postgresql' }),
      emailAndPassword: { enabled: true, requireEmailVerification: false },
    })

    await auth.api.signUpEmail({
      body: { email: adminEmail, password: adminPassword, name: 'Admin' },
    })

    await prisma.user.update({
      where: { email: adminEmail },
      data: { role: 'ADMIN' },
    })

    console.log('Admin user created successfully!')
    console.log('Email:', adminEmail)

    await pool.end()
  } catch (error) {
    console.error('Error creating admin user:', error)
    await pool.end()
    process.exit(1)
  }
}

createAdminUser()
