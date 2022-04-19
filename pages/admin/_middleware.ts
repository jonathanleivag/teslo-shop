import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { ILogin } from '../../interfaces/loginInterface'

export async function middleware (req: NextRequest, ev: NextFetchEvent) {
  const { origin } = req.nextUrl
  const session = await getToken({
    req: req as any,
    secret: process.env.NEXTAUTH_SECRET
  })

  if (!session) {
    const requestPage = req.page.name
    return NextResponse.redirect(`${origin}/auth/login?redirect=${requestPage}`)
  }

  const user = session.user as ILogin

  if (user.user.role !== 'admin') {
    return NextResponse.redirect(origin)
  }

  return NextResponse.next()
}
