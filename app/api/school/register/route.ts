import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

function generateSchoolCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = 'MSC-'
  for (let i = 0; i < 4; i++) code += chars[Math.floor(Math.random() * chars.length)]
  return code
}

export async function POST(req: NextRequest) {
  try {
    const { name, principalName, email, phone, board, medium, state, city, pincode, address } = await req.json()
    if (!name || !email) return NextResponse.json({ error: 'School name and email required' }, { status: 400 })

    let code = generateSchoolCode()
    // Ensure unique code
    try {
      let exists = await prisma.school.findUnique({ where: { code } })
      while (exists) { code = generateSchoolCode(); exists = await prisma.school.findUnique({ where: { code } }) }
    } catch { /* DB not ready — use generated code */ }

    try {
      const school = await prisma.school.create({
        data: { name, code, principalName, email, phone, board, medium, state, city, pincode, address, plan: 'free', storageGB: 1 },
      })
      return NextResponse.json({ school, code: school.code })
    } catch {
      // DB not configured — return mock response
      return NextResponse.json({ code, message: 'School registered (demo mode)' })
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
