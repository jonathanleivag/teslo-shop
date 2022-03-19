import { FC } from 'react'
import Image from 'next/image'
import { IProduct } from '../../interfaces'

export interface ProductCardComponentProps {
  product: IProduct
}

export const ProductCardComponet: FC<ProductCardComponentProps> = ({
  product
}) => {
  return (
    <div className='w-full h-[400px] 2xl:h-[440px] flex flex-col'>
      <div className='w-full h-[90%] relative'>
        <Image
          layout='fill'
          src={`/products/${product.images[0]}`}
          alt={product.description}
          objectFit='contain'
        />
      </div>
      <div className='w-full h-[10%]'>
        <h3 className='text-lg font-bold'>{product.title}</h3>
        <h3 className='text-sm font-bold'>${product.price}</h3>
      </div>
    </div>
  )
}
