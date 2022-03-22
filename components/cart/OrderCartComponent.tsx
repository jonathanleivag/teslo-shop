import { FC } from 'react'
import { OrderSummaryCartComponent } from '..'

export interface IOrderCartComponentProps {
  title?: string
  resume?: boolean
  buttonText?: string
}

export const OrderCartComponent: FC<IOrderCartComponentProps> = ({
  title = 'Orden',
  resume = false,
  buttonText = 'Checkout'
}) => {
  return (
    <div className='w-[90%] min-h-[100px] border rounded-xl shadow-lg px-2'>
      <div className='border-b px-2 py-1'>
        <h3> {title} </h3>
      </div>
      <OrderSummaryCartComponent resume={resume} />
      <button className='w-full my-3 py-1 bg-blue-600 text-white rounded-full'>
        {buttonText}
      </button>
    </div>
  )
}
