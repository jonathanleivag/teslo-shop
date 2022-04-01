import { FC } from 'react'
import { useSelector } from 'react-redux'
import { SummaryResumePersonalComponent } from '..'
import { priceClp } from '../../helpers'
import { RootState } from '../../store'
import { NEXT_PUBLIC_TAX } from '../../utils'

export interface IOrderSummaryCartComponentProps {
  resume: boolean
}

export const OrderSummaryCartComponent: FC<IOrderSummaryCartComponentProps> = ({
  resume
}) => {
  const { numberOfItem, subtotal, tax, total } = useSelector(
    (state: RootState) => state.cart.ordenSummary
  )
  return (
    <div className='w-full py-3'>
      {resume && <SummaryResumePersonalComponent />}
      {resume && (
        <div className='w-full flex flex-row justify-end'>
          <a className='text-sm text-blue-600'>Editar</a>
        </div>
      )}
      <div className='w-full flex flex-row'>
        <div className='w-1/2 flex flex-row justify-start'>Nº de producto:</div>
        <div className='w-1/2 flex flex-row justify-end'>
          {numberOfItem} {numberOfItem === 1 ? 'producto' : 'productos'}
        </div>
      </div>
      <div className='w-full flex flex-row'>
        <div className='w-1/2 flex flex-row justify-start'>Subtotal:</div>
        <div className='w-1/2 flex flex-row justify-end'>
          {' '}
          {priceClp(subtotal)}{' '}
        </div>
      </div>
      <div className='w-full flex flex-row'>
        <div className='w-1/2 flex flex-row justify-start'>
          Impuesto ({NEXT_PUBLIC_TAX}%):
        </div>
        <div className='w-1/2 flex flex-row justify-end'>{priceClp(tax)}</div>
      </div>
      <div className='w-full flex flex-row font-bold mt-3'>
        <div className='w-1/2 flex flex-row justify-start'>Total:</div>
        <div className='w-1/2 flex flex-row justify-end'>{priceClp(total)}</div>
      </div>
    </div>
  )
}
