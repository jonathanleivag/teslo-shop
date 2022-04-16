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
