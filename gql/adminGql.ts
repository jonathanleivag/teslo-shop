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

export const getAllOrderGql = gql`
  query GetAllOrder($idUser: ID!) {
    getAllOrder(idUser: $idUser) {
      id
      user {
        name
        email
      }
      numberOfItem
      total
      isPaid
      paidAt
      paymetResult
      address {
        address
        country {
          value
        }
      }
      updatedAt
    }
  }
`

export const GetOneOrderAdminGql = gql`
  query GetOneOrderAdmin($input: GetOneOrderAdminInput) {
    getOneOrderAdmin(input: $input) {
      id
      user {
        id
      }
      numberOfItem
      subtotal
      tax
      total
      isPaid
      paidAt
      paymetResult
      orderItems {
        id
        image
        price
        slug
        title
        gender
        size
        quantity
      }
      address {
        address
        address0
        postalCode
        city
        phono
        country {
          label
        }
      }
    }
  }
`
