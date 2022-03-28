import axios from 'axios'
import { GetServerSideProps, NextPage, GetServerSidePropsResult } from 'next'
import { ProductListComponent, TitleUiComponent } from '../../components'
import { IProduct } from '../../interfaces'
import { ShopLayout } from '../../layouts'

export interface ISearchPageProps {
  products: IProduct[]
  foundProducts: boolean
  query: string
}

const SearchPage: NextPage<ISearchPageProps> = ({
  products,
  query,
  foundProducts
}) => {
  return (
    <ShopLayout
      title={'Teslo-Shop - Search'}
      pageDescription={'Encuentra los mejores producto de teslo shop aquí'}
    >
      <TitleUiComponent>Busqueda de producto</TitleUiComponent>
      {foundProducts && (
        <h2 className='prose-xl'>
          Resultado de la busqueda:{' '}
          <span className='text-blue-600 capitalize'>{query}</span>
        </h2>
      )}
      {!foundProducts && (
        <h2 className='prose-xl'>No encontramos ningún producto </h2>
      )}
      {!foundProducts && (
        <h2 className='prose-xl text-blue-600 capitalize'> {query} </h2>
      )}
      <ProductListComponent products={products} />
    </ShopLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  let resp: GetServerSidePropsResult<IProduct[] | {}> = { props: {} }

  const error = {
    redirect: {
      destination: '/',
      permanent: false
    }
  }

  try {
    const { data } = await axios({
      url: process.env.URL_API,
      method: 'POST',
      data: {
        query: `
        query SearchProduct {
          searchProduct(search: ${JSON.stringify(params!.query)}) {
            id
            images
            inStock
            price
            slug
            title
          }
        }
              `
      }
    })

    if (params!.query?.length === 0) resp = error

    const foundProducts = data.data.searchProduct.length > 0

    if (data.errors) {
      // resp = error
    } else {
      if (foundProducts) {
        resp = {
          props: {
            products: data.data.searchProduct,
            foundProducts,
            query: params!.query
          }
        }
      } else {
        const { data } = await axios({
          url: process.env.URL_API,
          method: 'POST',
          data: {
            query: `
            query Products {
              products {
                id
                images
                inStock
                price
                slug
                title
              }
            }
                  `
          }
        })
        resp = {
          props: {
            products: data.data.products,
            foundProducts,
            query: params!.query
          }
        }
      }
    }
  } catch (e) {
    // resp = error
  }

  return resp
}

export default SearchPage
