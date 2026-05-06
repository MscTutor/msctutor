import { NextRequest, NextResponse } from 'next/server'

// GET — fetch branch-filtered comments
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const branch = searchParams.get('branch') ?? 'general'

  try {
    const { default: prisma } = await import('@/lib/prisma')
    const limit = Number(searchParams.get('limit') ?? 20)
    const page  = Number(searchParams.get('page') ?? 1)
    const where: any = { isApproved: true }
    if (branch !== 'all') where.branch = branch

    const [comments, total] = await Promise.all([
      prisma.comment.findMany({ where, orderBy: { createdAt: 'desc' }, take: limit, skip: (page - 1) * limit, include: { replies: { orderBy: { createdAt: 'asc' } } } }),
      prisma.comment.count({ where }),
    ])
    return NextResponse.json({ comments, total, page })
  } catch {
    // DB not configured — return empty
    return NextResponse.json({ comments: [], total: 0, page: 1 })
  }
}

// POST — create comment (anyone can comment)
export async function POST(req: NextRequest) {
  try {
    const { content, branch, rating, pageUrl, questionId, subjectId } = await req.json()
    if (!content?.trim()) return NextResponse.json({ error: 'Comment cannot be empty' }, { status: 400 })

    let userId: string | undefined
    let userName = 'Anonymous'
    let isRegistered = false

    const token = req.headers.get('Authorization')?.replace('Bearer ', '')
    if (token) {
      try {
        const { adminAuth } = await import('@/lib/firebase-admin')
        const decoded = await adminAuth.verifyIdToken(token)
        userId = decoded.uid
        userName = decoded.name ?? decoded.email ?? 'Student'
        isRegistered = true
      } catch { /* not logged in */ }
    }

    try {
      const { default: prisma } = await import('@/lib/prisma')
      const comment = await prisma.comment.create({
        data: {
          content: content.trim(), userId, userName, branch,
          rating: rating ? Number(rating) : null,
          pageUrl,
          questionId: questionId ? Number(questionId) : null,
          subjectId:  subjectId  ? Number(subjectId)  : null,
          isRegistered, isApproved: true,
        },
        include: { replies: true },
      })
      return NextResponse.json({ comment, success: true })
    } catch {
      // DB not configured — return mock success
      return NextResponse.json({
        comment: { id: Date.now(), content, userName, branch, rating, likes: 0, createdAt: new Date(), isRegistered, replies: [] },
        success: true
      })
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
