import axios from 'axios'
import { print } from 'graphql'
import { GetStaticProps, GetStaticPropsResult, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FormCheckoutComponent, TitleUiComponent } from '../../../components'
import { getCountriesGql } from '../../../gql'
import { ShopLayout } from '../../../layouts'
import { TCountry } from '../../../store/features'
import { RootState } from '../../../store/index'

export interface IAddressPageProps {
  countries: TCountry[]
}

const AddressPage: NextPage<IAddressPageProps> = ({ countries }) => {
  const numberOfItem = useSelector(
    (state: RootState) => state.cart.ordenSummary.numberOfItem
  )

  const message = useSelector((state: RootState) => state.address.message)
  const isError = useSelector((state: RootState) => state.address.isError)
  const [editSelected, setEditSelected] = useState<string | boolean>(false)

  const router = useRouter()

  useEffect(() => {
    if (numberOfItem === 0) {
      router.push('/')
    }

    return () => {}
  }, [numberOfItem, router])

  useEffect(() => {
    const { edit = null } = router.query

    if (edit === null) setEditSelected(false)
    else setEditSelected(edit.toString())
    return () => {}
  }, [router.query])

  if (numberOfItem === 0) return <></>

  return (
    <ShopLayout
      title={'Dirección'}
      pageDescription={'Confirmar la dirección del destino - Teslo Shop'}
    >
      <TitleUiComponent>Dirección</TitleUiComponent>
      {isError && (
        <div className='flex flex-row justify-center items-center my-3'>
          <div className='w-full md:w-[60%] text-center bg-red-600 rounded-full'>
            <p className='text-white'>{message}</p>
          </div>
        </div>
      )}
      <div className='w-full flex flex-col justify-center items-center'>
        <FormCheckoutComponent countries={countries} />
        {editSelected === 'address' && (
          <button
            onClick={() => router.push('/checkout/address/history')}
            className='p-1 w-[90%] md:w-[30%] border border-blue-600 text-blue-600 rounded-full'
          >
            Historial de direcciones
          </button>
        )}
      </div>
    </ShopLayout>
  )
}

export const getStaticProps: GetStaticProps = async ctx => {
  let res: GetStaticPropsResult<IAddressPageProps> = {
    props: { countries: [] }
  }
  const { data } = await axios.post(
    process.env.URL_API!,
    {
      query: print(getCountriesGql)
    },
    {
      withCredentials: true
    }
  )

  if (data.errors) {
    res = { redirect: { destination: '/', permanent: false } }
  } else {
    res = {
      props: {
        countries: data.data.getCountries
      }
    }
  }

  return res
}

export default AddressPage
