import { GetStaticProps, GetStaticPropsResult, NextPage } from 'next'
import { IHomePageProps } from '..'
import { ProductListComponent, TitleUiComponent } from '../../components'
import { ProductsGql } from '../../gql'
import { ShopLayout } from '../../layouts'
import { axiosGraphqlUtils, REVALIDATE, URL_API_GRAPHQL } from '../../utils'

const KidPage: NextPage<IHomePageProps> = ({ products }) => {
  return (
    <ShopLayout
      title={'Teslo-Shop para niño - Home'}
      pageDescription={
        'Encuentra los mejores producto de teslo shop para niño aquí'
      }
    >
      <TitleUiComponent>Niños</TitleUiComponent>
      <h2 className='mb-5 prose-xl'>Todos los productos para niño</h2>
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
    variables: { gender: 'kid' },
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

export default KidPage
