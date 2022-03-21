import { FC } from 'react'
import { OrderSummaryCartComponent } from '..'

export const OrderCartComponent: FC = () => {
  return (
    <div className='w-[90%] min-h-[100px] border rounded-xl shadow-lg px-2'>
      <div className='border-b px-2'>
        <h3>Orden</h3>
      </div>
      <OrderSummaryCartComponent />
      <button className='w-full my-3 bg-blue-600 text-white rounded-full'>
        Checkout
      </button>
    </div>
  )
}
