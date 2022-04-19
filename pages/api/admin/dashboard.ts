import { NextApiRequest, NextApiResponse } from 'next'
import { IDashboard } from '../../admin'
import { axiosGraphqlUtils } from '../../../utils/axiosGraphqlUtils'
import { dashboardGql } from '../../../gql'
import { URL_API } from '../../../utils'

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
  const data = await axiosGraphqlUtils({ query: dashboardGql, url: URL_API })

  if (!data.errors) {
    const dashboardData: IDashboard = data.data.dashboard
    resp = dashboardData
  }

  res.status(200).json(resp)
}
