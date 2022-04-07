import { gql } from 'graphql-tag'

export const getCountriesGql = gql`
  query GetCountries {
    getCountries {
      label
      value
    }
  }
`
