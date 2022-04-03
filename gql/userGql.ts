import { gql } from 'graphql-tag'

export const loginGql = gql`
  query Login($input: UserLoginInput!) {
    login(input: $input) {
      message
      token
      user {
        id
        name
        email
        role
        createdAt
        updatedAt
      }
    }
  }
`
