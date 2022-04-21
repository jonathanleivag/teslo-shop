import { gql } from 'graphql-tag'

export const dashboardGql = gql`
  query Dashboard($idUser: ID!) {
    dashboard(idUser: $idUser) {
      numberOfOrders
      paidOrders
      numberOfClient
      numberOfProducts
      productsWithNoInventory
      lowInventory
      noPaidOrders
    }
  }
`

export const getUsersGql = gql`
  query GetUsers($idUser: ID!) {
    getUsers(idUser: $idUser) {
      id
      name
      email
      role
      createdAt
      updatedAt
    }
  }
`
export const updateRoleGql = gql`
  mutation UpdateRole($input: UpdateRoleInput) {
    updateRole(input: $input)
  }
`
