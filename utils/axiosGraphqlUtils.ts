import axios from 'axios'
import { DocumentNode, print } from 'graphql'
import { NEXT_PUBLIC_URL_API } from '.'

export interface IAxiosGraphqlUtils {
  query: DocumentNode
  variables?: object
}

export const axiosGraphqlUtils = async ({
  query,
  variables
}: IAxiosGraphqlUtils) => {
  const { data } = await axios.post(NEXT_PUBLIC_URL_API, {
    query: print(query),
    variables
  })

  return data
}
