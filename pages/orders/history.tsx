import { formatDistanceToNow } from 'date-fns'
import es from 'date-fns/locale/es'
import { GetServerSideProps, GetServerSidePropsResult, NextPage } from 'next'
import { getSession } from 'next-auth/react'
import Link from 'next/link'
import { Cell, Column, HeaderCell, Table } from 'rsuite-table'
import 'rsuite-table/dist/css/rsuite-table.css'
import { TitleUiComponent } from '../../components'
import { getAllOrdersByUserGql } from '../../gql'
import { priceClp } from '../../helpers'
import { IOrderOne } from '../../interfaces'
import { ILogin } from '../../interfaces/loginInterface'
import { ShopLayout } from '../../layouts'
import { axiosGraphqlUtils } from '../../utils'
import { URL_API } from '../../utils/envUtil'

export interface IHistoryProps {
  orders: IOrderOne[]
}

const HistoryPage: NextPage<IHistoryProps> = ({ orders }) => {
  return (
    <ShopLayout
      title={'Historial de ordenes'}
      pageDescription={'Historial de ordenes'}
    >
      <TitleUiComponent>Historial de ordenes</TitleUiComponent>
      <div>
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
                  <a href={`mailto:${rowData.email}`}>{rowData.user.email}</a>
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
                  <p> {priceClp(rowData.total)} </p>
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
              {(rowData, _) => (
                <p>{formatDistanceToNow(+rowData.updatedAt, { locale: es })}</p>
              )}
            </Cell>
          </Column>
          <Column width={100} align='center' resizable>
            <HeaderCell>Orden</HeaderCell>
            <Cell>
              {(rowData, _) => (
                <Link href={`/orders/${rowData.id}`} passHref>
                  <a className='text-blue-600'> ver orden </a>
                </Link>
              )}
            </Cell>
          </Column>
        </Table>
      </div>
    </ShopLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  let resp: GetServerSidePropsResult<IHistoryProps>

  const session = await getSession({ req: ctx.req })
  const user = session?.user as ILogin | null

  try {
    const data = await axiosGraphqlUtils({
      query: getAllOrdersByUserGql,
      variables: {
        idUser: user?.user.id
      },
      url: URL_API
    })

    if (!data.errors) {
      resp = { props: { orders: data.data.getAllOrderByUser as IOrderOne[] } }
    } else {
      resp = {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }
  } catch (error) {
    resp = {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
    console.error(error)
  }

  return resp
}

export default HistoryPage
