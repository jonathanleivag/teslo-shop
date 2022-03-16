import { NextPage } from 'next'
import { ShopLayout } from '../layouts'

const Home: NextPage = () => {
  return (
    <ShopLayout
      title={'Teslo-Shop - Home'}
      pageDescription={'Encuentra los mejores producto de teslo shop aquí'}
    >
      <h1>TESLO SHOP</h1>
      <h2 className='mb-1'>Todos los productos</h2>
    </ShopLayout>
  )
}

export default Home
