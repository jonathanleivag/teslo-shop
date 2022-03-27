import { NextPage } from 'next'
import {
  FullScreenLoadingUiComponent,
  ProductListComponent,
  TitleUiComponent
} from '../../components'
import { useProducts } from '../../hooks'
import { ShopLayout } from '../../layouts'

const MenPage: NextPage = () => {
  const { isLoading, products } = useProducts({}, 'men')

  return (
    <ShopLayout
      title={'Teslo-Shop para hombres - Home'}
      pageDescription={
        'Encuentra los mejores producto de teslo shop para hombres aquí'
      }
    >
      <TitleUiComponent>Hombres</TitleUiComponent>
      <h2 className='mb-5 prose-xl'>Todos los productos para hombres</h2>
      {isLoading && <FullScreenLoadingUiComponent />}
      {!isLoading && <ProductListComponent products={products} />}
    </ShopLayout>
  )
}

export default MenPage
