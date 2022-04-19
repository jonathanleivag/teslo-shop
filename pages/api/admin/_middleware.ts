import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { ILogin } from '../../../interfaces'

export async function middleware (req: NextRequest, ev: NextFetchEvent) {
  const session = await getToken({
    req: req as any,
    secret: process.env.NEXTAUTH_SECRET
  })

  const respError: Response = new Response(
    JSON.stringify({ mensage: 'Usuario no autorizado' }),
    {
      status: 401,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )

  if (!session) {
    return respError
  }

  const user = session.user as ILogin

  if (user.user.role !== 'admin') {
    return respError
  }

  return NextResponse.next()
}
