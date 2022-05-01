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
      }
    }
  }
`
export const registerGql = gql`
  mutation Register($input: UserRegisterInput) {
    register(input: $input) {
      message
      token
      user {
        id
        name
        email
        role
      }
    }
  }
`

export const checkTokenGql = gql`
  query CheckToken {
    checkToken {
      token
      user {
        id
        name
        email
        role
      }
    }
  }
`

export const loginWithOauthGql = gql`
  mutation LoginWithOauth($input: UserLoginWithOauthInput!) {
    loginWithOauth(input: $input) {
      token
      user {
        id
        name
        email
        role
        createdAt
        updatedAt
      }
      message
    }
  }
`

export const getOneUserGql = gql`
  query GetOneUser($idUser: ID!) {
    getOneUser(idUser: $idUser) {
      user {
        id
        name
        email
        role
      }
      type
    }
  }
`

export const updateUserGql = gql`
  mutation UpdateUser($input: UserUpdateInput) {
    updateUser(input: $input)
  }
`
