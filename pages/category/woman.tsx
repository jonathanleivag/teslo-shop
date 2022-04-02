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

const WomanPage: NextPage = () => {
  const { products, loading } = useSelector((state: RootState) => state.product)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(addProduct('woman'))
    return () => {}
  }, [dispatch])

  return (
    <ShopLayout
      title={'Teslo-Shop para mujeres - Home'}
      pageDescription={
        'Encuentra los mejores producto de teslo shop para mujeres aquí'
      }
    >
      <TitleUiComponent>Mujeres</TitleUiComponent>
      <h2 className='mb-5 prose-xl'>Todos los productos para mujeres</h2>
      {loading && <FullScreenLoadingUiComponent />}
      {!loading && <ProductListComponent products={products} />}
    </ShopLayout>
  )
}

export default WomanPage
