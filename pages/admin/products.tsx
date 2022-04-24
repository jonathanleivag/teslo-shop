// import { formatDistanceToNow } from 'date-fns'
// import format from 'date-fns/format'
// import es from 'date-fns/locale/es'
import { GetServerSideProps, GetServerSidePropsResult, NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { MdOutlineCategory } from 'react-icons/md'
import { Cell, Column, HeaderCell, Table } from 'rsuite-table'
import 'rsuite-table/dist/css/rsuite-table.css'
import { productsAdmin } from '../../gql'
import { useBlurDataURL } from '../../hooks'
// import { priceClp } from '../../helpers'
import { IProduct } from '../../interfaces'
import { AdminLayout } from '../../layouts/AdminLayout'
import { axiosGraphqlUtils, URL_API } from '../../utils'

export interface IProductsPageProps {
  products: IProduct[]
}

const ProductsAdminPage: NextPage<IProductsPageProps> = ({ products }) => {
  const blurDataUrl = useBlurDataURL(20, 20 * 0.9)
  return (
    <AdminLayout
      title={`Productos (${products.length})`}
      subTitle={'Mantenimientos de productos'}
      titleHead={'Productos'}
      Icon={MdOutlineCategory}
    >
      <Table
        renderEmpty={() => (
          <div className='w-full h-full flex flex-row justify-center items-center'>
            <p>No hay productos</p>
          </div>
        )}
        data={products}
      >
        <Column width={100} fixed resizable>
          <HeaderCell>Imagen</HeaderCell>
          <Cell>
            {(rowData, _) => {
              return (
                <Link href={`/product/${rowData.slug}`} passHref>
                  <a>
                    <Image
                      src={`/products/${rowData.images[0]}`}
                      alt='Picture of the author'
                      layout='fill'
                      objectFit='contain'
                      className='transform duration-300 ease-in-out z-40'
                      loading='lazy'
                      placeholder='blur'
                      blurDataURL={blurDataUrl}
                    />
                  </a>
                </Link>
              )
            }}
          </Cell>
        </Column>
        <Column width={250} resizable>
          <HeaderCell>Título</HeaderCell>
          <Cell dataKey='title' />
        </Column>
        <Column width={100} resizable>
          <HeaderCell>Género</HeaderCell>
          <Cell dataKey='gender' />
        </Column>
        <Column width={100} resizable>
          <HeaderCell>Tipo</HeaderCell>
          <Cell dataKey='type' />
        </Column>
        <Column width={100} resizable>
          <HeaderCell>Inventario</HeaderCell>
          <Cell dataKey='inStock' />
        </Column>
        <Column width={100} resizable>
          <HeaderCell>Precio</HeaderCell>
          <Cell dataKey='price' />
        </Column>
        <Column width={250} resizable>
          <HeaderCell>Tallas</HeaderCell>
          <Cell>
            {(rowData, _) => {
              return rowData.sizes.join(', ')
            }}
          </Cell>
        </Column>
      </Table>
    </AdminLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  let resp: GetServerSidePropsResult<IProductsPageProps>

  try {
    const data = await axiosGraphqlUtils({
      query: productsAdmin,
      url: URL_API
    })

    if (!data.errors) {
      resp = { props: { products: data.data.products as IProduct[] } }
    } else {
      resp = {
        redirect: {
          destination: '/admin',
          permanent: false
        }
      }
    }
  } catch (error) {
    resp = {
      redirect: {
        destination: '/admin',
        permanent: false
      }
    }
    console.error(error)
  }

  return resp
}

export default ProductsAdminPage
