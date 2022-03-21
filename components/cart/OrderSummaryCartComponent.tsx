import { FC } from 'react'

export const OrderSummaryCartComponent: FC = () => {
  return (
    <div className='w-full py-3'>
      <div className='w-full flex flex-row'>
        <div className='w-1/2 flex flex-row justify-start'>Nº de producto:</div>
        <div className='w-1/2 flex flex-row justify-end'>3 items</div>
      </div>
      <div className='w-full flex flex-row'>
        <div className='w-1/2 flex flex-row justify-start'>Subtotal:</div>
        <div className='w-1/2 flex flex-row justify-end'>$155.5</div>
      </div>
      <div className='w-full flex flex-row'>
        <div className='w-1/2 flex flex-row justify-start'>Impuesto (6%):</div>
        <div className='w-1/2 flex flex-row justify-end'>$33.5</div>
      </div>
      <div className='w-full flex flex-row font-bold mt-3'>
        <div className='w-1/2 flex flex-row justify-start'>Total:</div>
        <div className='w-1/2 flex flex-row justify-end'>$186.34</div>
      </div>
    </div>
  )
}
