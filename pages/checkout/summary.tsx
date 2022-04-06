import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import {
  CardListCartComponent,
  OrderCartComponent,
  TitleUiComponent
} from '../../components'
import { ShopLayout } from '../../layouts'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'

const SummaryPage: NextPage = () => {
  const router = useRouter()
  const name = useSelector((state: RootState) => state.direcition.name)

  useEffect(() => {
    if (name === '') {
      router.push('/checkout/address')
    }
    return () => {}
  }, [name, router])

  if (name === '') return <></>

  return (
    <ShopLayout
      title={'Resumen de ordern'}
      pageDescription={'Resumen de ordern'}
    >
      <TitleUiComponent>Resumen de orden</TitleUiComponent>
      <div className='w-full flex flex-col gap-10 sm:flex-row'>
        <div className='w-full sm:max-h-[calc(100vh-250px)] sm:overflow-y-auto sm:w-[60%] sm:overflow-hidden'>
          <CardListCartComponent />
        </div>

        <div className='w-full sm:w-[40%] flex flex-row justify-center items-start rounded-full'>
          <OrderCartComponent
            resume
            title='Resumen de orden (3 productos)'
            buttonText='Confirmar orden'
          />
        </div>
      </div>
    </ShopLayout>
  )
}

export default SummaryPage
