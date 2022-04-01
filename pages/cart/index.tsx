import { NextPage } from 'next'
import { useSelector } from 'react-redux'
import {
  CardListCartComponent,
  OrderCartComponent,
  TitleUiComponent
} from '../../components'
import { ShopLayout } from '../../layouts'
import { RootState } from '../../store'

const CartPage: NextPage = () => {
  const productsInCart = useSelector(
    (state: RootState) => state.cart.ordenSummary.numberOfItem
  )
  return (
    <ShopLayout
      title={`Carrito - ${productsInCart} ${
        productsInCart > 1 ? 'productos' : 'producto'
      }`}
      pageDescription={'Carrito de compras Toslo Shop'}
    >
      <TitleUiComponent>Carrito</TitleUiComponent>
      <div className='w-full flex flex-col gap-10 sm:flex-row'>
        <div className='w-full sm:max-h-[calc(100vh-250px)] sm:overflow-y-auto sm:w-[60%] sm:overflow-hidden'>
          <CardListCartComponent edit />
        </div>

        <div className='w-full sm:w-[40%] flex flex-row justify-center items-start rounded-full'>
          <OrderCartComponent />
        </div>
      </div>
    </ShopLayout>
  )
}

export default CartPage
