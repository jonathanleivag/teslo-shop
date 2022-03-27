import { NextPage } from 'next'
import {
  FullScreenLoadingUiComponent,
  ProductListComponent,
  TitleUiComponent
} from '../components'
import { ShopLayout } from '../layouts'
import { useProducts } from '../hooks/useProducts'

const HomePage: NextPage = () => {
  const { isLoading, products } = useProducts()

  return (
    <ShopLayout
      title={'Teslo-Shop - Home'}
      pageDescription={'Encuentra los mejores producto de teslo shop aquí'}
    >
      <TitleUiComponent>TESLO SHOP</TitleUiComponent>
      <h2 className='mb-5 prose-xl'>Todos los productos</h2>
      {isLoading && <FullScreenLoadingUiComponent />}
      {!isLoading && <ProductListComponent products={products} />}
    </ShopLayout>
  )
}

export default HomePage
