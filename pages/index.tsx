import { GetServerSideProps, NextPage, GetServerSidePropsResult } from 'next'
import { ProductListComponent, TitleUiComponent } from '../components'
import { ShopLayout } from '../layouts'
import { IProduct } from '../interfaces'
import { axiosGraphqlUtils, URL_API_GRAPHQL } from '../utils'
import { ProductsGql } from '../gql'

export interface IHomePageProps {
  products: IProduct[]
}

const HomePage: NextPage<IHomePageProps> = ({ products }) => {
  return (
    <ShopLayout
      title={'Teslo-Shop - Home'}
      pageDescription={'Encuentra los mejores producto de teslo shop aquí'}
    >
      <TitleUiComponent>TESLO SHOP</TitleUiComponent>
      <h2 className='mb-5 prose-xl'>Todos los productos</h2>
      <ProductListComponent products={products} />
    </ShopLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  let resp: GetServerSidePropsResult<IHomePageProps> = {
    props: { products: [] }
  }

  const data = await axiosGraphqlUtils({
    query: ProductsGql,
    variables: { gender: null },
    url: URL_API_GRAPHQL
  })

  if (!data.errors) {
    resp = {
      props: {
        products: data.data.products
      }
    }
  }

  return resp
}

export default HomePage
