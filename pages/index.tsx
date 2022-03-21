import { NextPage } from 'next'
import { ShopLayout } from '../layouts'
import { initialData } from '../database/products'
import { ProductListComponent, TitleUiComponent } from '../components'

const HomePage: NextPage = () => {
  return (
    <ShopLayout
      title={'Teslo-Shop - Home'}
      pageDescription={'Encuentra los mejores producto de teslo shop aquí'}
    >
      <TitleUiComponent>TESLO SHOP</TitleUiComponent>
      <h2 className='mb-5 prose-xl'>Todos los productos</h2>
      <ProductListComponent products={initialData.products} />
    </ShopLayout>
  )
}

export default HomePage
