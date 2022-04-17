import { gql } from 'graphql-tag'

export const addOrderGql = gql`
  mutation AddOrder($input: AddOrderInput) {
    addOrder(input: $input)
  }
`

export const loadOrderInCartGql = gql`
  query LoadOrderInCart($idUser: ID!) {
    loadOrderInCart(idUser: $idUser) {
      numberOfItem
      subtotal
      tax
      total
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
    }
  }
`

export const orderGql = gql`
  mutation Order($idUser: ID!, $address: ID!) {
    order(idUser: $idUser, address: $address)
  }
`
export const getOneOrderGql = gql`
  query GetOneOrder($getOneOrderId: ID!) {
    getOneOrder(id: $getOneOrderId) {
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

export const getAllOrdersByUserGql = gql`
  query GetAllOrderByUser($idUser: ID!) {
    getAllOrderByUser(idUser: $idUser) {
      id
      user {
        id
        name
        email
        role
        createdAt
        updatedAt
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
      inCart
      address {
        id
        address
        address0
        postalCode
        city
        phono
        country {
          id
          label
          value
        }
        user {
          id
          name
          email
          role
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
    }
  }
`
