import { NextPage } from 'next'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  FullScreenLoadingUiComponent,
  ProductListComponent,
  TitleUiComponent
} from '../../components'
import { ShopLayout } from '../../layouts'
import { RootState } from '../../store'
import { addProduct } from '../../store/features'

const MenPage: NextPage = () => {
  const { products, loading } = useSelector((state: RootState) => state.product)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(addProduct('men'))
    return () => {}
  }, [dispatch])

  return (
    <ShopLayout
      title={'Teslo-Shop para hombres - Home'}
      pageDescription={
        'Encuentra los mejores producto de teslo shop para hombres aquí'
      }
    >
      <TitleUiComponent>Hombres</TitleUiComponent>
      <h2 className='mb-5 prose-xl'>Todos los productos para hombres</h2>
      {loading && <FullScreenLoadingUiComponent />}
      {!loading && <ProductListComponent products={products} />}
    </ShopLayout>
  )
}

export default MenPage
