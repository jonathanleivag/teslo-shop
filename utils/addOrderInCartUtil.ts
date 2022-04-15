import { addOrderGql } from '../gql'
import { ILogin } from '../interfaces'
import { ICartData, IOrdenSummary } from '../store/features/cart/cartSlice'
import { axiosGraphqlUtils } from './axiosGraphqlUtils'

export const addOrderInCartUtil = async (
  session: ILogin | null,
  ordenSummary: IOrdenSummary,
  orderItems: ICartData[]
) =>
  await axiosGraphqlUtils({
    query: addOrderGql,
    variables: {
      input: {
        idUser: session?.user.id,
        ...ordenSummary,
        orderItems
      }
    }
  })
