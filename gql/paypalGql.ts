import { gql } from 'graphql-tag'

export const payPaypalGql = gql`
  mutation PayPaypal($input: PayPaypalInput) {
    payPaypal(input: $input)
  }
`
