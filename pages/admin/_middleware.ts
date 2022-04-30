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

    switch (name) {
      case '/admin':
        requestPage = '/admin'
        break
      case '/admin/orders':
        requestPage = '/admin/orders'
        break
      case '/admin/orders/[id]':
        requestPage = '/admin/orders/' + params!.id
        break
      case '/admin/orders/status/[status]':
        requestPage = '/admin/orders/status/' + params!.status
        break
      case '/admin/users':
        requestPage = '/admin/users'
        break
      case '/admin/products':
        requestPage = '/admin/products'
        break
      case '/admin/products/[slug]':
        requestPage = '/admin/products/' + params!.slug
        break
      case '/admin/products/status/[status]':
        requestPage = '/admin/products/status/' + params!.status
        break
      default:
        requestPage = '/'
        break
    }

    return NextResponse.redirect(`${origin}/auth/login?redirect=${requestPage}`)
  }

  const user = session.user as ILogin

  if (user.user.role !== 'admin') {
    return NextResponse.redirect(origin)
  }

  return NextResponse.next()
}
