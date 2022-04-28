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
  query GetAllOrder($idUser: ID!, $status: EStatus) {
    getAllOrder(idUser: $idUser, status: $status) {
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
export const productsAdmin = gql`
  query Products {
    products {
      images
      gender
      type
      inStock
      price
      title
      sizes
      slug
      updatedAt
    }
  }
`
export const ProductBySlugAdminGql = gql`
  query ProductBySlug($slug: String!) {
    productBySlug(slug: $slug) {
      id
      tags
      type
      gender
      description
      images
      slug
      inStock
      price
      sizes
      title
    }
  }
`

export const updateProductGql = gql`
  mutation UpdateProduct($input: UpdateProductInput) {
    updateProduct(input: $input)
  }
`

export const addProductGql = gql`
  mutation AddProduct($input: UpdateProductInput) {
    addProduct(input: $input)
  }
`

export const uploadImageGql = gql`
  mutation UploadImage($file: Upload!, $idUser: ID!) {
    uploadImage(file: $file, idUser: $idUser) {
      filename
      mimetype
      encoding
    }
  }
`
export const productsWithNoInventoryGql = gql`
  query ProductsWithNoInventory($idUser: ID!) {
    productsWithNoInventory(idUser: $idUser) {
      images
      gender
      type
      inStock
      price
      title
      sizes
      slug
      updatedAt
    }
  }
`
