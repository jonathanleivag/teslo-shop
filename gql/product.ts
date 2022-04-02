import { TGender } from '../interfaces'

export type TUseProducts = TGender | null

export const ProductsGql = (gender: TUseProducts) => ` query Products {
  products(gender: ${gender}) {
    id
    images
    inStock
    price
    slug
    title
  }
}`

export const ProducByIdGql = (id: String) => ` query producById {
  producById(id: ${JSON.stringify(id)}) {
    inStock
  }
}`

export const SlugProductsGql = () => `
query Products {
  products {
    slug
  }
}
`

export const ProductBySlugGql = (slug: String) => `
query ProductBySlug {
  productBySlug(slug: ${JSON.stringify(slug)}) {
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

export const SearchProductGql = (query: string) => `
  query SearchProduct {
    searchProduct(search: ${JSON.stringify(query)}) {
      id
      images
      inStock
      price
      slug
      title
    }
  }
        `

export const AllProductsGql = () => `
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
