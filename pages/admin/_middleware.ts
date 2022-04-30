import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { ILogin } from '../../interfaces/loginInterface'

export async function middleware (req: NextRequest, ev: NextFetchEvent) {
  const { origin } = req.nextUrl
  const { name, params } = req.page
  const session = await getToken({
    req: req as any,
    secret: process.env.NEXTAUTH_SECRET
  })

  if (!session) {
    let requestPage = ''

    if (name === '/admin') {
      requestPage = '/admin'
    }

    if (name === '/admin/orders') {
      requestPage = '/admin/orders'
    }

    if (name === '/admin/orders/[id] ') {
      requestPage = '/admin/orders/' + params!.id
    }

    if (name === '/admin/orders/status/[status]') {
      requestPage = '/admin/orders/status/' + params!.status
    }

    if (name === '/admin/users') {
      requestPage = '/admin/users'
    }

    if (name === '/admin/products') {
      requestPage = '/admin/products'
    }

    if (name === '/admin/products/[slug]') {
      requestPage = '/admin/products/' + params!.slug
    }

    if (name === '/admin/products/status/[status]') {
      requestPage = '/admin/products/status/' + params!.status
    }

    return NextResponse.redirect(`${origin}/auth/login?redirect=${requestPage}`)
  }

  const user = session.user as ILogin

  if (user.user.role !== 'admin') {
    return NextResponse.redirect(origin)
  }

  return NextResponse.next()
}
