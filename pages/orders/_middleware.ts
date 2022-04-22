import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware (req: NextRequest, ev: NextFetchEvent) {
  const { origin } = req.nextUrl
  const session = await getToken({
    req: req as any,
    secret: process.env.NEXTAUTH_SECRET
  })

  if (!session) {
    const requestPage = req.page.params?.id
      ? `/orders/${req.page.params!.id}`
      : '/orders/history'
    return NextResponse.redirect(`${origin}/auth/login?redirect=${requestPage}`)
  }

  return NextResponse.next()
}
