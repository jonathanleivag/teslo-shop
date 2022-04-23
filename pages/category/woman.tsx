import { GetServerSideProps, GetServerSidePropsResult, NextPage } from 'next'
import { IHomePageProps } from '..'
import { ProductListComponent, TitleUiComponent } from '../../components'
import { ProductsGql } from '../../gql'
import { ShopLayout } from '../../layouts'
import { axiosGraphqlUtils, URL_API } from '../../utils'

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

export const getServerSideProps: GetServerSideProps = async ctx => {
  let resp: GetServerSidePropsResult<IHomePageProps> = {
    props: { products: [] }
  }

  const data = await axiosGraphqlUtils({
    query: ProductsGql,
    variables: { gender: 'woman' },
    url: URL_API
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

export default WomanPage
