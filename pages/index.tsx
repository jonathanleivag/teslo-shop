import { NextPage } from 'next'
import Image from 'next/image'
import { ShopLayout } from '../layouts'
import { initialData } from '../database/products'

const HomePage: NextPage = () => {
  return (
    <ShopLayout
      title={'Teslo-Shop - Home'}
      pageDescription={'Encuentra los mejores producto de teslo shop aquí'}
    >
      <h1 className='prose-2xl font-bold pb-10'>TESLO SHOP</h1>
      <h2 className='mb-5 prose-xl'>Todos los productos</h2>
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-14'>
        {initialData.products.map(product => (
          <div
            key={product.title}
            className='w-full h-[400px] 2xl:h-[440px] flex flex-col'
          >
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
        ))}
      </div>
    </ShopLayout>
  )
}

export default HomePage
