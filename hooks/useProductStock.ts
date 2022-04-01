import axios from 'axios'
import useSWR, { SWRConfiguration } from 'swr'
import { IProduct } from '../interfaces'
import { NEXT_PUBLIC_URL_API } from '../utils'

const fetcher = (url: string, id: string) =>
  axios({
    url,
    method: 'POST',
    data: {
      query: `
      query ProducById {
        producById(id: ${JSON.stringify(id)}) {
          inStock
        }
      }
      `
    }
  })
    .then(res => res.data.data.producById)
    .catch(error => console.error(error))

export const useProductStock = (config: SWRConfiguration = {}, id: string) => {
  const { data, error } = useSWR<IProduct>(
    NEXT_PUBLIC_URL_API,
    (url: string) => fetcher(url, id),
    config
  )
  return {
    inStock: data?.inStock,
    isLoading: !error && !data,
    isError: error
  }
}
