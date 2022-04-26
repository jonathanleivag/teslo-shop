import { formatDistanceToNow } from 'date-fns'
import format from 'date-fns/format'
import es from 'date-fns/locale/es'
import { GetServerSideProps, GetServerSidePropsResult, NextPage } from 'next'
import { getSession } from 'next-auth/react'
import { getAllOrderGql } from '../../../../gql'
import { IOrderOne } from '../../../../interfaces'
import { ILogin } from '../../../../interfaces/loginInterface'
import { axiosGraphqlUtils, URL_API } from '../../../../utils'
import { AdminLayout, IAdminLayoutProps } from '../../../../layouts'
import { BsCartCheck } from 'react-icons/bs'
import { Cell, Column, HeaderCell, Table } from 'rsuite-table'
import 'rsuite-table/dist/css/rsuite-table.css'
import { priceUSD } from '../../../../helpers'
import Link from 'next/link'
import { IHistoryProps } from '../../../orders/history'
import { useState, useEffect } from 'react'

export type TStatus = 'pending' | 'paid' | 'all'

export interface IPropsOrderByStatusPage extends IHistoryProps {
  status: TStatus
}

const OrderByStatusAdminPage: NextPage<IPropsOrderByStatusPage> = ({
  orders,
  status
}) => {
  const [titles, setTitles] = useState<IAdminLayoutProps>({
    title: 'Ordenes',
    subTitle: 'Mantenimientos de ordenes',
    titleHead: 'Ordenes'
  })

  useEffect(() => {
    if (status === 'pending') {
      setTitles({
        title: 'Ordenes pendientes',
        subTitle: 'Mantenimientos de ordenes pendientes',
        titleHead: 'Ordenes pendientes'
      })
    }

    if (status === 'paid') {
      setTitles({
        title: 'Ordenes pagadas',
        subTitle: 'Mantenimientos de ordenes pagadas',
        titleHead: 'Ordenes pagadas'
      })
    }
    return () => {}
  }, [status])

  return (
    <AdminLayout
      title={titles.title}
      subTitle={titles.subTitle}
      titleHead={titles.titleHead}
      Icon={BsCartCheck}
    >
      <Table
        renderEmpty={() => (
          <div className='w-full h-full flex flex-row justify-center items-center'>
            <p>No hay ordenes</p>
          </div>
        )}
        data={orders}
      >
        <Column width={100} sortable fixed resizable>
          <HeaderCell>Orden</HeaderCell>
          <Cell dataKey='id' />
        </Column>
        <Column width={200} resizable>
          <HeaderCell>Nombre</HeaderCell>
          <Cell dataKey='user.name' />
        </Column>
        <Column width={150} resizable>
          <HeaderCell>Email</HeaderCell>
          <Cell>
            {(rowData, _) => {
              return (
                <a href={`mailto:${rowData.user.email}`}>
                  {rowData.user.email}
                </a>
              )
            }}
          </Cell>
        </Column>
        <Column width={150} align='center' resizable>
          <HeaderCell>Estado</HeaderCell>
          <Cell>
            {(rowData, _) => (
              <>
                {rowData.isPaid && (
                  <div className='w-full border border-green-600 rounded-full px-1'>
                    <p className='text-green-600'> Pagado </p>
                  </div>
                )}
                {!rowData.isPaid && (
                  <div className='w-full border border-red-600 rounded-full px-1'>
                    <p className='text-red-600'> No pagado </p>
                  </div>
                )}
              </>
            )}
          </Cell>
        </Column>
        <Column width={100} resizable>
          <HeaderCell>Cantidad</HeaderCell>
          <Cell>
            {(rowData, _) => (
              <div className='flex flex-row justify-end'>
                <p> {rowData.numberOfItem} </p>
              </div>
            )}
          </Cell>
        </Column>
        <Column width={100} resizable>
          <HeaderCell>Total</HeaderCell>
          <Cell>
            {(rowData, _) => (
              <div className='flex flex-row justify-end'>
                <p> {priceUSD(rowData.total)} </p>
              </div>
            )}
          </Cell>
        </Column>
        <Column width={150} resizable>
          <HeaderCell>Dirección</HeaderCell>
          <Cell dataKey='address.address' />
        </Column>
        <Column width={100} resizable>
          <HeaderCell>País</HeaderCell>
          <Cell dataKey='address.country.value' />
        </Column>
        <Column width={160} resizable>
          <HeaderCell>Fecha</HeaderCell>
          <Cell>
            {(rowData, _) => <p>{format(+rowData.updatedAt, 'dd/MM/yyyy')}</p>}
          </Cell>
        </Column>
        <Column width={160} resizable>
          <HeaderCell>Hace</HeaderCell>
          <Cell>
            {(rowData, _) => (
              <p>{formatDistanceToNow(+rowData.updatedAt, { locale: es })}</p>
            )}
          </Cell>
        </Column>
        <Column width={100} align='center' resizable>
          <HeaderCell>Orden</HeaderCell>
          <Cell>
            {(rowData, _) => (
              <Link href={`/admin/orders/${rowData.id}`} passHref>
                <a className='text-blue-600'> ver orden </a>
              </Link>
            )}
          </Cell>
        </Column>
      </Table>
    </AdminLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  let resp: GetServerSidePropsResult<IPropsOrderByStatusPage>

  const session = await getSession({ req: ctx.req })
  const user = session?.user as ILogin | null
  const { status = 'all' } = ctx.query as { status: TStatus }
  try {
    const data = await axiosGraphqlUtils({
      query: getAllOrderGql,
      variables: {
        idUser: user?.user.id,
        status
      },
      url: URL_API
    })

    if (!data.errors) {
      resp = { props: { orders: data.data.getAllOrder as IOrderOne[], status } }
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

export default OrderByStatusAdminPage
