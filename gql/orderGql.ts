import { gql } from 'graphql-tag'

export const addOrderGql = gql`
  mutation AddOrder($input: AddOrderInput) {
    addOrder(input: $input)
  }
`
