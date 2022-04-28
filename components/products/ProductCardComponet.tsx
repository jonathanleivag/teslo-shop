import Image from 'next/image'
import Link from 'next/link'
import { FC, useState } from 'react'
import { useBlurDataURL } from '../../hooks'
import { IProduct } from '../../interfaces'

export interface ProductCardComponentProps {
  product: IProduct
}

export const ProductCardComponet: FC<ProductCardComponentProps> = ({
  product
}) => {
  const [onHovered, setOnHovered] = useState<boolean>(false)
  const blurDataUrl = useBlurDataURL(100, 400 * 0.9)

  return (
    <Link href={`/product/${product.slug}`} passHref prefetch={false}>
      <a>
        <div
          className='w-full h-[400px] 2xl:h-[440px] flex flex-col'
          onMouseEnter={() => setOnHovered(true)}
          onMouseLeave={() => setOnHovered(false)}
        >
          <div className='w-full h-[90%] relative'>
            {product.inStock === 0 && (
              <div className='absolute z-[45] top-5 w-full flex flex-row justify-end pr-5'>
                <div className='py-[2px] px-[4px] bg-black rounded-full'>
                  <p className='text-white p-[2px] text-sm'>
                    No hay disponible
                  </p>
                </div>
              </div>
            )}
            <Image
              layout='fill'
              src={product.images[onHovered ? 1 : 0]}
              alt={product.description}
              objectFit='contain'
              className='transform duration-300 ease-in-out z-40'
              loading='lazy'
              placeholder='blur'
              blurDataURL={blurDataUrl}
            />
          </div>
          <div className='w-full h-[10%]'>
            <h3 className='text-lg font-bold'>{product.title}</h3>
            <h3 className='text-sm font-bold'>${product.price}</h3>
          </div>
        </div>
      </a>
    </Link>
  )
}
