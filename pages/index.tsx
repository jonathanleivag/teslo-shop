import { NextPage, GetStaticProps, GetStaticPropsResult } from 'next'
import { ProductListComponent, TitleUiComponent } from '../components'
import { ShopLayout } from '../layouts'
import { IProduct } from '../interfaces'
import { axiosGraphqlUtils, REVALIDATE, URL_API_GRAPHQL } from '../utils'
import { ProductsGql } from '../gql'

export interface IHomePageProps {
  products: IProduct[]
}

const HomePage: NextPage<IHomePageProps> = ({ products }) => {
  return (
    <ShopLayout
      title={'Home'}
      pageDescription={'Encuentra los mejores producto de teslo shop aquí'}
      imageFullUrl={products[0].images[0]}
    >
      <TitleUiComponent>TESLO SHOP</TitleUiComponent>
      <h2 className='mb-5 prose-xl'>Todos los productos de teslo-shop</h2>
      <ProductListComponent products={products} />
    </ShopLayout>
  )
}

export const getStaticProps: GetStaticProps = async ctx => {
  let resp: GetStaticPropsResult<IHomePageProps> = {
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
      },
      revalidate: REVALIDATE
    }
  }

  return resp
}

export default HomePage
