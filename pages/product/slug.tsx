import { NextPage } from 'next'
import {
  ButtonAddProductComponent,
  CarouselProductSlugComponent,
  CountUiComponent,
  SizeSelectorProductSlugComponent
} from '../../components'
import { initialData } from '../../database/products'
import { ShopLayout } from '../../layouts'

const product = initialData.products[5]

const SlugPage: NextPage = () => {
  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <div className='w-full min-h-[100vh] flex flex-col xl:flex-row'>
        <div className='w-full xl:w-[60%] relative overflow-hidden'>
          <CarouselProductSlugComponent product={product} />
        </div>
        <div className='w-full xl:w-[40%] flex flex-col lg:flex-row xl:flex-col justify-center items-center lg:items-start xl:justify-start xl:items-center'>
          <div className='w-[90%]'>
            <h1 className='font-semibold text-3xl'>{product.title}</h1>
            <p className='text-xl my-2'>${product.price} </p>
            <h2 className='text-lg my-2'>Cantidad </h2>
            <CountUiComponent />
          </div>
          <div className='w-[90%]'>
            <h2 className='text-lg my-2'>Talla</h2>
            <SizeSelectorProductSlugComponent
              selectedSize={undefined}
              sizes={product.sizes}
            />
            <div className='w-full lg:hidden'>
              <ButtonAddProductComponent />
            </div>
            <h2 className='text-lg my-2'>Descripción</h2>
            <p className='text-sm'> {product.description} </p>
            <div className='w-full hidden lg:block'>
              <ButtonAddProductComponent />
            </div>
          </div>
        </div>
      </div>
    </ShopLayout>
  )
}

export default SlugPage
