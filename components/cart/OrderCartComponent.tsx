import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { OrderSummaryCartComponent } from '..'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store/index'
import { orderAndReset } from '../../store/features'
import { useSession0 } from '../../hooks/useSession0'
import { MdCreditCardOff, MdOutlineCreditScore } from 'react-icons/md'
import { PayPalButtonsOrderComponent } from '../order'
import { IOrderOne } from '../../interfaces'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

export interface IOrderCartComponentProps {
  title?: string
  resume?: boolean
  buttonText?: string
  byId?: boolean
  edit?: boolean
  orderOne?: IOrderOne
}

export const OrderCartComponent: FC<IOrderCartComponentProps> = ({
  title = 'Orden',
  resume = false,
  buttonText = 'Checkout',
  byId = false,
  edit = true,
  orderOne
}) => {
  const router = useRouter()
  const address = useSelector((state: RootState) => state.address.address)
  const selectedAddress = useSelector(
    (state: RootState) => state.address.selectedAddress
  )
  const order = useSelector((state: RootState) => state.order.selectedOrder)
  const dispatch = useDispatch()
  const session = useSession0()
  const [isPaying, setIsPaying] = useState<boolean>(false)

  const handleRedirect = () => {
    if (title === 'Orden') {
      if (address.length === 0) {
        router.push('/checkout/address')
      } else {
        router.push('/checkout/address/history')
      }
    }

    if (buttonText === 'Confirmar orden') {
      if (session?.user.id && selectedAddress) {
        dispatch(orderAndReset(session.user.id!, selectedAddress.id!, router))
      }
    }
  }

  return (
    <div className='w-[90%] min-h-[100px] border rounded-xl shadow-lg px-2 overflow-hidden'>
      <div className='border-b px-2 py-1'>
        <h3> {title} </h3>
      </div>
      <OrderSummaryCartComponent edit={edit} resume={resume} />

      {byId && order?.isPaid && (
        <div className='w-full my-3'>
          <div className='border w-[200px] text-center rounded-full border-green-600 flex flex-row justify-center items-center gap-2'>
            <MdOutlineCreditScore className='text-green-600' />
            <p className='text-green-600'>Ya pagado</p>
          </div>
        </div>
      )}

      {byId && !order?.isPaid && (
        <div className='w-full my-3 flex flex-col justify-center items-center'>
          <div className='w-full flex flex-row justify-center md:justify-start items-center'>
            <div className='border w-[95%] md:w-[200px] text-center rounded-full border-red-600 flex flex-row justify-center items-center gap-2'>
              <MdCreditCardOff className='text-red-600' />
              <p className='text-red-600'>Pendiente de pago</p>
            </div>
          </div>
          <div className='w-[95%] p-1 my-5 rounded-full'>
            {!isPaying && (
              <PayPalButtonsOrderComponent
                orderId={orderOne?.id!}
                total={orderOne?.total!}
                setIsPaying={setIsPaying}
              />
            )}
            {isPaying && (
              <div className='w-full flex flex-row justify-center items-center'>
                <AiOutlineLoading3Quarters className='animate-spin text-4xl text-blue-600' />
              </div>
            )}
          </div>
        </div>
      )}

      {!byId && (
        <button
          onClick={handleRedirect}
          className='w-full my-3 py-1 bg-blue-600 text-white rounded-full'
        >
          {buttonText}
        </button>
      )}
    </div>
  )
}
