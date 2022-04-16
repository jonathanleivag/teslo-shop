import { FC, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { CardCartComponent } from '..'
import { OrderItemOrderOne } from '../../interfaces'
import { RootState } from '../../store'
import { ICartData } from '../../store/features'
import { useRouter } from 'next/router'

export interface ICardListCartComponentProps {
  edit?: boolean
}

export type TProduct = OrderItemOrderOne[] | ICartData[]

export const CardListCartComponent: FC<ICardListCartComponentProps> = ({
  edit = false
}) => {
  const router = useRouter()
  const orderItems = useSelector(
    (state: RootState) => state.order.selectedOrder?.orderItems!
  )
  const cart = useSelector((state: RootState) => state.cart.cart)
  const [productsInCart, setProductsInCart] = useState<TProduct>(
    router.pathname === '/cart' || router.pathname === '/checkout/summary'
      ? cart
      : orderItems
  )

  useEffect(() => {
    setProductsInCart(
      router.pathname === '/cart' || router.pathname === '/checkout/summary'
        ? cart
        : orderItems
    )

    return () => {}
  }, [cart, orderItems, router.pathname])

  return (
    <div className='w-full flex flex-col px-5 py-3 gap-3'>
      {productsInCart &&
        productsInCart.map(product => (
          <CardCartComponent
            key={`${product.id}-${product.size}`}
            product={product}
            edit={edit}
          />
        ))}
    </div>
  )
}
