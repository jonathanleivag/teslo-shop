export interface IProduct {
  id: string
  description: string
  images: string[]
  inStock: number
  price: number
  sizes: TValidSizes[]
  slug: string
  tags: string[]
  title: string
  type: TValidTypes
  gender: 'men' | 'women' | 'kid' | 'unisex'
}

export type TValidSizes = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL'
export type TValidTypes = 'shirts' | 'pants' | 'hoodies' | 'hats'
