import Link from 'next/link'
import { FC, useState, useEffect } from 'react'
import { SummaryResumePersonalComponent } from '..'
import { priceClp } from '../../helpers'
import { NEXT_PUBLIC_TAX } from '../../utils'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { IOrderOne } from '../../interfaces'
import { IOrdenSummary } from '../../store/features/cart/cartSlice'
import { useRouter } from 'next/router'

export interface IOrderSummaryCartComponentProps {
  resume: boolean
  edit: boolean
}

export const OrderSummaryCartComponent: FC<IOrderSummaryCartComponentProps> = ({
  resume,
  edit
}) => {
  const selectedOrder = useSelector(
    (state: RootState) => state.order.selectedOrder
  )
  const ordenSummary = useSelector(
    (state: RootState) => state.cart.ordenSummary
  )
  const router = useRouter()
  const [order, setOrder] = useState<IOrderOne | IOrdenSummary>(
    router.pathname === '/cart' || router.pathname === '/checkout/summary'
      ? ordenSummary
      : selectedOrder!
  )

  useEffect(() => {
    setOrder(
      router.pathname === '/cart' || router.pathname === '/checkout/summary'
        ? ordenSummary
        : selectedOrder!
    )

    return () => {}
  }, [ordenSummary, router.pathname, selectedOrder])

  return (
    <div className='w-full py-3'>
      {resume && <SummaryResumePersonalComponent edit={edit} />}
      {resume && edit && (
        <div className='w-full flex flex-row justify-end'>
          <Link href='/cart' passHref>
            <a className='text-sm text-blue-600'>Editar</a>
          </Link>
        </div>
      )}
      <div className='w-full flex flex-row'>
        <div className='w-1/2 flex flex-row justify-start'>Nº de producto:</div>
        <div className='w-1/2 flex flex-row justify-end'>
          {order?.numberOfItem}{' '}
          {order?.numberOfItem === 1 ? 'producto' : 'productos'}
        </div>
      </div>
      <div className='w-full flex flex-row'>
        <div className='w-1/2 flex flex-row justify-start'>Subtotal:</div>
        <div className='w-1/2 flex flex-row justify-end'>
          {priceClp(order?.subtotal as number)}
        </div>
      </div>
      <div className='w-full flex flex-row'>
        <div className='w-1/2 flex flex-row justify-start'>
          Impuesto ({NEXT_PUBLIC_TAX}%):
        </div>
        <div className='w-1/2 flex flex-row justify-end'>
          {priceClp(order?.tax as number)}
        </div>
      </div>
      <div className='w-full flex flex-row font-bold mt-3'>
        <div className='w-1/2 flex flex-row justify-start'>Total:</div>
        <div className='w-1/2 flex flex-row justify-end'>
          {priceClp(order?.total as number)}
        </div>
      </div>
    </div>
  )
}
