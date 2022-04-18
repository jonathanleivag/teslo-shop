import { GetServerSideProps, GetServerSidePropsResult, NextPage } from 'next'
import { getSession } from 'next-auth/react'
import { useEffect } from 'react'
import { MdCreditCardOff, MdOutlineCreditScore } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import {
  CardListCartComponent,
  OrderCartComponent,
  TitleUiComponent
} from '../../components'
import { getOneOrderGql } from '../../gql'
import { IOrderOne } from '../../interfaces'
import { ILogin } from '../../interfaces/loginInterface'
import { ShopLayout } from '../../layouts'
import { changeSelectedOrder } from '../../store/features'
import { axiosGraphqlUtils, URL_API } from '../../utils'

export interface IPropsOrderByIdPage {
  order: IOrderOne
}

const OrderByIdPage: NextPage<IPropsOrderByIdPage> = ({ order }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(changeSelectedOrder(order))
    return () => {}
  }, [dispatch, order])

  return (
    <ShopLayout
      title={'Resumen de ordern'}
      pageDescription={`Resumen de ordern ${order.id}`}
    >
      <TitleUiComponent>
        <span className='flex flex-row gap-1'>
          <span>Orden: </span>
          <span className='md:hidden'>
            {order.id.length > 10
              ? `${order.id.substring(0, 10)}...`
              : order.id}
          </span>
          <span className='hidden md:flex'>{order.id}</span>
        </span>
      </TitleUiComponent>
      <div className='w-full flex flex-col gap-10 sm:flex-row justify-center items-start'>
        <div className='w-full sm:max-h-[calc(100vh-250px)] sm:overflow-y-auto sm:w-[60%] sm:overflow-hidden'>
          <div className='w-full my-3'>
            {order.isPaid && (
              <div className='border w-[200px] text-center rounded-full border-green-600 flex flex-row justify-center items-center gap-2'>
                <MdOutlineCreditScore className='text-green-600' />
                <p className='text-green-600'>Ya pagado</p>
              </div>
            )}
            {!order.isPaid && (
              <div className='border w-[200px] text-center rounded-full border-red-600 flex flex-row justify-center items-center gap-2'>
                <MdCreditCardOff className='text-red-600' />
                <p className='text-red-600'>Pendiente de pago</p>
              </div>
            )}
          </div>
          <CardListCartComponent />
        </div>

        <div className='w-full sm:w-[40%] flex flex-row justify-center items-start rounded-full'>
          <OrderCartComponent
            resume
            edit={false}
            title={'Resumen de orden'}
            byId
            orderOne={order}
          />
        </div>
      </div>
    </ShopLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  let resp: GetServerSidePropsResult<{}> = { props: {} }

  const session = await getSession({ req: ctx.req })
  const user = session?.user as ILogin
  const { id = '' } = ctx.query

  if (!session) {
    resp = {
      redirect: {
        destination: `/auth/login?redirect=/orders/${id}`,
        permanent: false
      }
    }
  } else {
    try {
      const data = await axiosGraphqlUtils({
        query: getOneOrderGql,
        variables: {
          getOneOrderId: id
        },
        url: URL_API
      })

      if (data.errors) {
        resp = {
          redirect: {
            destination: '/',
            permanent: false
          }
        }
      } else {
        const order = data.data.getOneOrder as IOrderOne
        if (user.user.id !== order.user.id) {
          resp = {
            redirect: {
              destination: '/orders/history',
              permanent: false
            }
          }
        } else {
          resp = {
            props: {
              order
            }
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
    }
  }

  return resp
}

export default OrderByIdPage
