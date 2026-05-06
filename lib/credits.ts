import prisma from './prisma'
import { CREDITS, PLANS } from './constants'

export async function getCredits(userId: string): Promise<number> {
  const user = await prisma.user.findUnique({ where: { firebaseUid: userId }, select: { credits: true } })
  return user?.credits ?? PLANS.free.credits
}

export async function deductCredits(userId: string, type: keyof typeof CREDITS): Promise<boolean> {
  const cost = CREDITS[type]
  const result = await prisma.user.updateMany({
    where: { firebaseUid: userId, credits: { gte: cost } },
    data:  { credits: { decrement: cost } },
  })
  return result.count > 0
}

export async function checkCredits(userId: string, type: keyof typeof CREDITS): Promise<boolean> {
  const credits = await getCredits(userId)
  return credits >= CREDITS[type]
}
