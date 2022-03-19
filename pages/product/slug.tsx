import { NextPage } from 'next'
import { ShopLayout } from '../../layouts'
import { initialData } from '../../database/products'
import Image from 'next/image'
import { useBlurDataURL } from '../../hooks'

const product = initialData.products[0]

const SlugPage: NextPage = () => {
  const blurDataUrl = useBlurDataURL(100, 400 * 0.9)
  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <div className='w-full min-h-[100vh] flex flex-col md:flex-row'>
        <div className='w-full md:w-[60%] h-96 md:h-auto relative'>
          <Image
            layout='fill'
            src={`/products/${product.images[0]}`}
            alt={product.description}
            className='transform duration-300 ease-in-out object-contain md:object-cover'
            loading='lazy'
            placeholder='blur'
            blurDataURL={blurDataUrl}
          />
        </div>
        <div className='w-full md:w-[40%] flex flex-row justify-center items-center md:items-start'>
          <div className='w-[90%]'>
            <h1 className='font-semibold text-3xl'>{product.title}</h1>
            <p className='text-xl my-2'>${product.price} </p>
            <h2 className='text-lg my-2'>Cantidad </h2>
            <button className='p-2 bg-blue-600 w-full text-white rounded-full my-5'>
              Agregar al carro
            </button>
            <h2 className='text-lg my-2'>Descripción</h2>
            <p className='text-sm'> {product.description} </p>
          </div>
        </div>
      </div>
    </ShopLayout>
  )
}

export default SlugPage
