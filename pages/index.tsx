import { NextPage } from 'next'
import { ShopLayout } from '../layouts'
import { initialData } from '../database/products'
import { ProductListComponent } from '../components'

const HomePage: NextPage = () => {
  return (
    <ShopLayout
      title={'Teslo-Shop - Home'}
      pageDescription={'Encuentra los mejores producto de teslo shop aquí'}
    >
      <h1 className='prose-2xl font-bold pb-10'>TESLO SHOP</h1>
      <h2 className='mb-5 prose-xl'>Todos los productos</h2>
      <ProductListComponent products={initialData.products} />
    </ShopLayout>
  )
}

export default HomePage
