import { GetStaticProps, NextPage, GetStaticPropsResult } from 'next'
import { IHomePageProps } from '..'
import { ProductListComponent, TitleUiComponent } from '../../components'
import { ProductsGql } from '../../gql'
import { ShopLayout } from '../../layouts'
import { axiosGraphqlUtils, REVALIDATE, URL_API_GRAPHQL } from '../../utils'

const WomanPage: NextPage<IHomePageProps> = ({ products }) => {
  return (
    <ShopLayout
      title={'Teslo-Shop para mujeres - Home'}
      pageDescription={
        'Encuentra los mejores producto de teslo shop para mujeres aquí'
      }
    >
      <TitleUiComponent>Mujeres</TitleUiComponent>
      <h2 className='mb-5 prose-xl'>Todos los productos para mujeres</h2>
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
    variables: { gender: 'woman' },
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

export default WomanPage
