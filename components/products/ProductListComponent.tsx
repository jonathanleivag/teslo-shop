import { FC } from 'react'
import { IProduct } from '../../interfaces'
import { ProductCardComponet } from './ProductCardComponet'

interface ProductListComponentProps {
  products: IProduct[]
}

export const ProductListComponent: FC<ProductListComponentProps> = ({
  products
}) => {
  return (
    <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-14'>
      {products.map(product => (
        <ProductCardComponet key={product.id} product={product} />
      ))}
    </div>
  )
}
