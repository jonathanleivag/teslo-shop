import { gql } from 'graphql-tag'

export const ProductsGql = gql`
  query Products($gender: EGender) {
    products(gender: $gender) {
      id
      images
      inStock
      price
      slug
      title
    }
  }
`

export const ProducByIdGql = gql`
  query ProducById($producByIdId: ID!) {
    producById(id: $producByIdId) {
      inStock
    }
  }
`

export const SlugProductsGql = gql`
  query Products {
    products {
      slug
    }
  }
`

export const ProductBySlugGql = gql`
  query ProductBySlug($slug: String!) {
    productBySlug(slug: $slug) {
      id
      slug
      gender
      description
      images
      inStock
      price
      sizes
      title
    }
  }
`

export const SearchProductGql = gql`
  query SearchProduct($search: String!) {
    searchProduct(search: $search) {
      id
      images
      inStock
      price
      slug
      title
    }
  }
`

export const AllProductsGql = gql`
  query Products {
    products {
      id
      images
      inStock
      price
      slug
      title
    }
  }
`
