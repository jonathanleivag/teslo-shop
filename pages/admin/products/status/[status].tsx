import { GetServerSideProps, GetServerSidePropsResult, NextPage } from 'next'
import { getSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { MdOutlineCategory } from 'react-icons/md'
import { Cell, Column, HeaderCell, Table } from 'rsuite-table'
import 'rsuite-table/dist/css/rsuite-table.css'
import { lowInventoryGql, productsWithNoInventoryGql } from '../../../../gql'
import { priceUSD } from '../../../../helpers'
import { useBlurDataURL } from '../../../../hooks'
import { ILogin, IProduct } from '../../../../interfaces'
import { AdminLayout } from '../../../../layouts'
import { axiosGraphqlUtils, URL_API_GRAPHQL } from '../../../../utils'

export type TStatus = 'no_inventory' | 'low_inventory'

export interface IProductsPageProps {
  products: IProduct[]
  status: TStatus
}

const ProductsStatusAdminPage: NextPage<IProductsPageProps> = ({
  products,
  status
}) => {
  const blurDataUrl = useBlurDataURL(20, 20 * 0.9)
  return (
    <AdminLayout
      title={`Productos ${
        status === 'no_inventory' ? 'sin existencias' : 'bajo inventario'
      } (${products.length})`}
      subTitle={`Mantenimientos de productos ${
        status === 'no_inventory' ? 'sin existencias' : 'bajo inventario'
      }`}
      titleHead={`Productos ${
        status === 'no_inventory' ? 'sin existencias' : 'bajo inventario'
      }`}
      Icon={MdOutlineCategory}
    >
      <div className='w-full flex flex-row justify-end items-center my-3'>
        <Link href={'/admin/products/new'}>
          <a className='py-1 px-2 bg-blue-600 text-white rounded-lg'>
            Crear producto
          </a>
        </Link>
      </div>
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
                      src={rowData.images[0]}
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
          <Cell>
            {(rowData, _) => {
              return priceUSD(rowData.price)
            }}
          </Cell>
        </Column>
        <Column width={250} resizable>
          <HeaderCell>Tallas</HeaderCell>
          <Cell>
            {(rowData, _) => {
              return rowData.sizes.join(', ')
            }}
          </Cell>
        </Column>
        <Column width={200} resizable>
          <HeaderCell>Producto</HeaderCell>
          <Cell>
            {(rowData, _) => (
              <div className='w-full flex flex-row justify-start items-center'>
                <Link href={`/admin/products/${rowData.slug}`}>
                  <a className='bg-yellow-400 p-1 mx-1'>
                    <AiFillEdit className='text-white' />
                  </a>
                </Link>
                <button className='bg-red-600 p-1 mx-1'>
                  <AiFillDelete className='text-white' />
                </button>
              </div>
            )}
          </Cell>
        </Column>
      </Table>
    </AdminLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  let resp: GetServerSidePropsResult<IProductsPageProps>
  const session = await getSession({ req: ctx.req })
  const user = session?.user as ILogin
  const { status } = ctx.query as { status: TStatus }

  const error = {
    redirect: {
      destination: '/admin',
      permanent: false
    }
  }

  try {
    let data: any
    if (status === 'no_inventory') {
      data = await axiosGraphqlUtils({
        query: productsWithNoInventoryGql,
        variables: {
          idUser: user.user.id
        },
        url: URL_API_GRAPHQL
      })
      if (!data.errors) {
        resp = {
          props: {
            products: data.data.productsWithNoInventory as IProduct[],
            status
          }
        }
      } else {
        resp = error
      }
    } else if (status === 'low_inventory') {
      data = await axiosGraphqlUtils({
        query: lowInventoryGql,
        variables: {
          idUser: user.user.id
        },
        url: URL_API_GRAPHQL
      })
      if (!data.errors) {
        resp = {
          props: {
            products: data.data.lowInventory as IProduct[],
            status
          }
        }
      } else {
        resp = error
      }
    } else {
      resp = error
    }
  } catch (e) {
    resp = error
    console.error(error)
  }

  return resp
}

export default ProductsStatusAdminPage
