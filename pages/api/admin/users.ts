import { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'
import { getUsersGql } from '../../../gql'
import { ILogin } from '../../../interfaces'
import { IUser } from '../../../store/features/user/userSlice'
import { axiosGraphqlUtils, URL_API } from '../../../utils'

export default async function getUsers (
  req: NextApiRequest,
  res: NextApiResponse<IUser[]>
) {
  let users: IUser[] = []
  const session = await getToken({
    req: req as any,
    secret: process.env.NEXTAUTH_SECRET
  })

  if (session) {
    const user = session.user as ILogin
    try {
      const data = await axiosGraphqlUtils({
        query: getUsersGql,
        variables: {
          idUser: user.user.id
        },
        url: URL_API
      })

      if (data.errors) {
        users = []
      } else {
        users = data.data.getUsers
      }
    } catch (error) {
      users = []
    }
  }

  res.status(200).json(users)
}
