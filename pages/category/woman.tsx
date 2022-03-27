import { NextPage } from 'next'
import {
  FullScreenLoadingUiComponent,
  ProductListComponent,
  TitleUiComponent
} from '../../components'
import { useProducts } from '../../hooks'
import { ShopLayout } from '../../layouts'

const WomanPage: NextPage = () => {
  const { isLoading, products } = useProducts({}, 'woman')

  return (
    <ShopLayout
      title={'Teslo-Shop para mujeres - Home'}
      pageDescription={
        'Encuentra los mejores producto de teslo shop para mujeres aquí'
      }
    >
      <TitleUiComponent>Mujeres</TitleUiComponent>
      <h2 className='mb-5 prose-xl'>Todos los productos para mujeres</h2>
      {isLoading && <FullScreenLoadingUiComponent />}
      {!isLoading && <ProductListComponent products={products} />}
    </ShopLayout>
  )
}

export default WomanPage
