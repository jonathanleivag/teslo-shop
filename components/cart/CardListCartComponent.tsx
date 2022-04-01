import { FC } from 'react'
import { useSelector } from 'react-redux'
import { CardCartComponent } from '..'
import { RootState } from '../../store'

export interface ICardListCartComponentProps {
  edit?: boolean
}

export const CardListCartComponent: FC<ICardListCartComponentProps> = ({
  edit = false
}) => {
  const productsInCart = useSelector((state: RootState) => state.cart.cart)
  return (
    <div className='w-full flex flex-col px-5 py-3 gap-3'>
      {productsInCart.map(product => (
        <CardCartComponent
          key={`${product.id}-${product.size}`}
          product={product}
          edit={edit}
        />
      ))}
    </div>
  )
}
