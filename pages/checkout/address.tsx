import { NextPage } from 'next'
import { FormCheckoutComponent, TitleUiComponent } from '../../components'
import { ShopLayout } from '../../layouts'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/index'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const AddressPage: NextPage = () => {
  const numberOfItem = useSelector(
    (state: RootState) => state.cart.ordenSummary.numberOfItem
  )

  const router = useRouter()

  useEffect(() => {
    if (numberOfItem === 0) {
      router.push('/')
    }

    return () => {}
  }, [numberOfItem, router])

  if (numberOfItem === 0) return <></>

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
