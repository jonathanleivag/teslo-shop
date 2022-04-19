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
