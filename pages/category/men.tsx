import { GetServerSideProps, GetServerSidePropsResult, NextPage } from 'next'
import { IHomePageProps } from '..'
import { ProductListComponent, TitleUiComponent } from '../../components'
import { ProductsGql } from '../../gql'
import { ShopLayout } from '../../layouts'
import { axiosGraphqlUtils, URL_API_GRAPHQL } from '../../utils'

const MenPage: NextPage<IHomePageProps> = ({ products }) => {
  return (
    <ShopLayout
      title={'Teslo-Shop para hombres - Home'}
      pageDescription={
        'Encuentra los mejores producto de teslo shop para hombres aquí'
      }
    >
      <TitleUiComponent>Hombres</TitleUiComponent>
      <h2 className='mb-5 prose-xl'>Todos los productos para hombres</h2>
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
    variables: { gender: 'men' },
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

export default MenPage
