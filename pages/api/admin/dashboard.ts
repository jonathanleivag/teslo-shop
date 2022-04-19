import { NextApiRequest, NextApiResponse } from 'next'
import { IDashboard } from '../../admin'
import { axiosGraphqlUtils } from '../../../utils/axiosGraphqlUtils'
import { dashboardGql } from '../../../gql'
import { URL_API } from '../../../utils'
import { getToken } from 'next-auth/jwt'
import { ILogin } from '../../../interfaces'

export default async function dashboard (
  req: NextApiRequest,
  res: NextApiResponse<IDashboard>
) {
  let resp: IDashboard = {
    numberOfOrders: 0,
    paidOrders: 0,
    numberOfClient: 0,
    numberOfProducts: 0,
    productsWithNoInventory: 0,
    lowInventory: 0,
    noPaidOrders: 0
  }
  const session = await getToken({
    req: req as any,
    secret: process.env.NEXTAUTH_SECRET
  })

  if (session) {
    const user = session.user as ILogin
    const data = await axiosGraphqlUtils({
      query: dashboardGql,
      url: URL_API,
      variables: { idUser: user.user.id }
    })

    if (!data.errors) {
      const dashboardData: IDashboard = data.data.dashboard
      resp = dashboardData
    }
  }

  res.status(200).json(resp)
}
