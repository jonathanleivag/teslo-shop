import { gql } from 'graphql-tag'

export const getAddressGql = gql`
  query GetAddress($getAddressId: ID!) {
    getAddress(id: $getAddressId) {
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
`

export const getAddressByUserGql = gql`
  query GetAddressesByUser($idUser: ID!) {
    getAddressesByUser(idUser: $idUser) {
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
`

export const addAddressGql = gql`
  mutation AddAddress($input: AddAddressInput) {
    addAddress(input: $input) {
      message
      address {
        id
        address
        address0
        postalCode
        city
        phono
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
        country {
          label
          value
        }
      }
    }
  }
`
export const editAddressGql = gql`
  mutation EditAddress($editAddressId: ID!, $input: AddAddressInput) {
    editAddress(id: $editAddressId, input: $input) {
      message
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

export const deleteAddressGql = gql`
  mutation DeleteAddress($deleteAddressId: ID!) {
    deleteAddress(id: $deleteAddressId)
  }
`
