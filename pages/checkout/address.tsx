import { NextPage } from 'next'
import { FormCheckoutComponent, TitleUiComponent } from '../../components'
import { ShopLayout } from '../../layouts'

const AddressPage: NextPage = () => {
  return (
    <ShopLayout
      title={'Dirección'}
      pageDescription={'Confirmar la dirección del destino - Teslo Shop'}
    >
      <TitleUiComponent>Dirección</TitleUiComponent>
      <div className='w-full flex flex-row justify-center items-center'>
        <FormCheckoutComponent />
      </div>
    </ShopLayout>
  )
}

export default AddressPage
