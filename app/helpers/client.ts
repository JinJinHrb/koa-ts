/* eslint-disable @typescript-eslint/no-namespace */
import { PrismaClient } from '@prisma/client'
declare global {
  namespace NodeJS {
    interface Global {
      prisma: PrismaClient
    }
  }
}

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (global && !(global as any).prisma) {
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;(global as any).prisma = new PrismaClient()
  }

  prisma = (global as any).prisma
}

export default prisma
