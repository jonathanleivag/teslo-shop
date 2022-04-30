import { GetServerSideProps, GetServerSidePropsResult, NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { MdOutlineCategory } from 'react-icons/md'
import { Cell, Column, HeaderCell, Table } from 'rsuite-table'
import 'rsuite-table/dist/css/rsuite-table.css'
import Swal from 'sweetalert2'
import { deleteProductGql, productsAdmin } from '../../../gql'
import { priceUSD } from '../../../helpers'
import { useBlurDataURL, useSession0 } from '../../../hooks'
import { IProduct } from '../../../interfaces'
import { AdminLayout } from '../../../layouts'
import { axiosGraphqlUtils, Toast, URL_API_GRAPHQL } from '../../../utils'

export interface IProductsPageProps {
  products: IProduct[]
}

const ProductsAdminPage: NextPage<IProductsPageProps> = ({ products }) => {
  const blurDataUrl = useBlurDataURL(20, 20 * 0.9)
  const session = useSession0()
  const [products0, setProducts0] = useState(products)

  const deleteProduct = async (id: string) => {
    try {
      const data = await axiosGraphqlUtils({
        query: deleteProductGql,
        variables: {
          input: {
            id,
            idUser: session?.user.id
          }
        }
      })

      if (!data.errors) {
        Toast.fire({
          icon: 'success',
          title: data.data.deleteProduct
        })
        setProducts0(items => items.filter(product => product.id !== id))
      } else {
        Toast.fire({
          icon: 'error',
          title: data.errors[0].message
        })
      }
    } catch (error) {
      Toast.fire({
        icon: 'error',
        title: 'Error al eliminar el producto'
      })
    }
  }

  const handlerDeleteProduct = async (id: string) => {
    Swal.fire({
      title: '¿Quieres eliminar el producto?',
      confirmButtonColor: '#FF0000',
      showCancelButton: true,
      confirmButtonText: 'Eliminar'
    }).then(result => {
      if (result.isConfirmed) {
        deleteProduct(id)
      }
    })
  }

  return (
    <AdminLayout
      title={`Productos (${products0.length})`}
      subTitle={'Mantenimientos de productos'}
      titleHead={'Productos'}
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
        data={products0}
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
                <button
                  type='button'
                  onClick={() => handlerDeleteProduct(rowData.id)}
                  className='bg-red-600 p-1 mx-1'
                >
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

  try {
    const data = await axiosGraphqlUtils({
      query: productsAdmin,
      url: URL_API_GRAPHQL
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
