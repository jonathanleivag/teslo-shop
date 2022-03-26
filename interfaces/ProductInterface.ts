export interface IProduct {
  id: string
  description: string
  images: string[]
  inStock: number
  price: number
  sizes: TValidSize[]
  slug: string
  tags: string[]
  title: string
  type: TValidType
  gender: 'men' | 'woman' | 'kid' | 'unisex'
}

export type TValidSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL'
export type TValidType = 'shirts' | 'pants' | 'hoodies' | 'hats'
