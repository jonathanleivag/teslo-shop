import { NextPage } from 'next'
import {
  FullScreenLoadingUiComponent,
  ProductListComponent,
  TitleUiComponent
} from '../components'
import { ShopLayout } from '../layouts'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store/index'
import { useEffect } from 'react'
import { addProduct } from '../store/features'

const HomePage: NextPage = () => {
  const { products, loading } = useSelector((state: RootState) => state.product)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(addProduct(null))
    return () => {}
  }, [dispatch])

  return (
    <ShopLayout
      title={'Teslo-Shop - Home'}
      pageDescription={'Encuentra los mejores producto de teslo shop aquí'}
    >
      <TitleUiComponent>TESLO SHOP</TitleUiComponent>
      <h2 className='mb-5 prose-xl'>Todos los productos</h2>
      {loading && <FullScreenLoadingUiComponent />}
      {!loading && <ProductListComponent products={products} />}
    </ShopLayout>
  )
}

export default HomePage
