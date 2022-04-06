import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import FacebookProvider from 'next-auth/providers/facebook'
import { loginGql, loginWithOauthGql } from '../../../gql'
import { IUser } from '../../../store/features'
import { axiosGraphqlUtils } from '../../../utils'
import GoogleProvider from 'next-auth/providers/google'

export type IRespOrNull = IUser | null

const loginWithOauthGqlData = async (email: string, name: string) => {
  const data = await axiosGraphqlUtils({
    query: loginWithOauthGql,
    variables: { input: { email, name } }
  })
  return data.data.loginWithOauth
}

export default NextAuth({
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: {
          label: 'Email: ',
          type: 'email',
          placeholder: 'email@email.cl'
        },
        password: {
          label: 'Contraseña: ',
          type: 'password',
          placeholder: '********'
        }
      },
      async authorize (credentials) {
        let resp: IRespOrNull = null
        const data = await axiosGraphqlUtils({
          query: loginGql,
          variables: {
            input: {
              email: credentials?.email,
              password: credentials?.password
            }
          }
        })

        if (data.errors) {
          resp = null
        } else {
          resp = data.data.login
        }

        return resp
      }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || '',
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || ''
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
    })
  ],
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register'
  },
  session: {
    strategy: 'jwt',
    maxAge: 2592000,
    updateAge: 86400
  },
  jwt: {},
  callbacks: {
    async jwt ({ token, account, user }) {
      if (account) {
        token.accessToken = account.accessToken

        switch (account?.type) {
          case 'credentials':
            token.user = user
            break
          case 'oauth':
            token.user = await loginWithOauthGqlData(user!.email!, user!.name!)
            break

          default:
            break
        }
      }
      return token
    },
    async session ({ session, user, token }) {
      session.accessToken = token.accessToken
      session.user = token.user as any
      return session
    }
  }
})
