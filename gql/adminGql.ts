import { gql } from 'graphql-tag'

export const dashboardGql = gql`
  query Dashboard {
    dashboard {
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
