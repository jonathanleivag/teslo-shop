import axios from 'axios'
import { print } from 'graphql'
import { NextPage, GetServerSidePropsResult, GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FormCheckoutComponent, TitleUiComponent } from '../../../components'
import { getCountriesGql, numberOfItemGql } from '../../../gql'
import { ILogin } from '../../../interfaces'
import { ShopLayout } from '../../../layouts'
import { TCountry } from '../../../store/features'
import { RootState } from '../../../store/index'
import { URL_API_GRAPHQL } from '../../../utils'

export interface IAddressPageProps {
  countries: TCountry[]
  numberOfItem?: number
}

const AddressPage: NextPage<IAddressPageProps> = ({ countries }) => {
  const message = useSelector((state: RootState) => state.address.message)
  const isError = useSelector((state: RootState) => state.address.isError)
  const [editSelected, setEditSelected] = useState<string | boolean>(false)

  const router = useRouter()

  useEffect(() => {
    const { edit = null } = router.query

    if (edit === null) setEditSelected(false)
    else setEditSelected(edit.toString())
    return () => {}
  }, [router.query])

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

export const getServerSideProps: GetServerSideProps = async ctx => {
  let res: GetServerSidePropsResult<IAddressPageProps> = {
    props: { countries: [], numberOfItem: 0 }
  }

  const session = await getSession({ req: ctx.req })
  const user = session?.user as ILogin

  const { data } = await axios.post(
    URL_API_GRAPHQL,
    {
      query: print(getCountriesGql)
    },
    {
      withCredentials: true
    }
  )

  const { data: data0 } = await axios.post(
    URL_API_GRAPHQL,
    {
      query: print(numberOfItemGql),
      variables: {
        idUser: user.user.id
      }
    },
    {
      withCredentials: true
    }
  )

  if (data.errors || data0.errors) {
    res = { redirect: { destination: '/', permanent: false } }
  } else {
    if (data0.data.loadOrderInCart.numberOfItem === 0) {
      res = { redirect: { destination: '/', permanent: false } }
    } else {
      res = {
        props: {
          countries: data.data.getCountries,
          numberOfItem: data0.data.loadOrderInCart.numberOfItem
        }
      }
    }
  }

  return res
}

export default AddressPage
