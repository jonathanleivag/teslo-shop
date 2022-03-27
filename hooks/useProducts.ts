import axios from 'axios'
import useSWR, { SWRConfiguration } from 'swr'
import { IProduct, TGender } from '../interfaces'
import { NEXT_PUBLIC_URL_API } from '../utils'

export type TUseProducts = TGender | null

const fetcher = (url: string, gender: TUseProducts = null) =>
  axios({
    url,
    method: 'POST',
    data: {
      query: `
      query Products {
        products(gender: ${gender}) {
          id
          images
          inStock
          price
          slug
          title
        }
      }
      `
    }
  }).then(res => res.data.data.products)

export const useProducts = (
  config: SWRConfiguration = {},
  gender: TUseProducts = null
) => {
  const { data, error } = useSWR<IProduct[]>(
    NEXT_PUBLIC_URL_API,
    url => fetcher(url, gender),
    config
  )
  return {
    products: data || [],
    isLoading: !error && !data,
    isError: error
  }
}
