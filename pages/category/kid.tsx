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

const KidPage: NextPage = () => {
  const { products, loading } = useSelector((state: RootState) => state.product)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(addProduct('kid'))
    return () => {}
  }, [dispatch])

  return (
    <ShopLayout
      title={'Teslo-Shop para niño - Home'}
      pageDescription={
        'Encuentra los mejores producto de teslo shop para niño aquí'
      }
    >
      <TitleUiComponent>Niños</TitleUiComponent>
      <h2 className='mb-5 prose-xl'>Todos los productos para niño</h2>
      {loading && <FullScreenLoadingUiComponent />}
      {!loading && <ProductListComponent products={products} />}
    </ShopLayout>
  )
}

export default KidPage
