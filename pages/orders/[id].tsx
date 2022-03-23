import { NextPage } from 'next'
import {
  CardListCartComponent,
  OrderCartComponent,
  TitleUiComponent
} from '../../components'
import { ShopLayout } from '../../layouts'

const OrderByIdPage: NextPage = () => {
  return (
    <ShopLayout
      title={'Resumen de ordern 1234'}
      pageDescription={'Resumen de ordern 123'}
    >
      <TitleUiComponent>Orden: 1234</TitleUiComponent>
      <div className='w-full flex flex-col gap-10 sm:flex-row'>
        <div className='w-full sm:max-h-[calc(100vh-250px)] sm:overflow-y-auto sm:w-[60%] sm:overflow-hidden'>
          <div className='w-full my-3'>
            <div className='border w-[100px] text-center rounded-full border-green-600'>
              <p className='text-green-600'>Ya pagado</p>
            </div>
          </div>
          <CardListCartComponent />
        </div>

        <div className='w-full sm:w-[40%] flex flex-row justify-center items-start rounded-full'>
          <OrderCartComponent resume title='Resumen de orden 1234' byId />
        </div>
      </div>
    </ShopLayout>
  )
}

export default OrderByIdPage
