import { NextPage } from 'next'
import {
  FullScreenLoadingUiComponent,
  ProductListComponent,
  TitleUiComponent
} from '../../components'
import { useProducts } from '../../hooks'
import { ShopLayout } from '../../layouts'

const KidPage: NextPage = () => {
  const { isLoading, products } = useProducts({}, 'kid')

  return (
    <ShopLayout
      title={'Teslo-Shop para niño - Home'}
      pageDescription={
        'Encuentra los mejores producto de teslo shop para niño aquí'
      }
    >
      <TitleUiComponent>Niños</TitleUiComponent>
      <h2 className='mb-5 prose-xl'>Todos los productos para niño</h2>
      {isLoading && <FullScreenLoadingUiComponent />}
      {!isLoading && <ProductListComponent products={products} />}
    </ShopLayout>
  )
}

export default KidPage
