import axios from 'axios'
import { GetServerSideProps, GetServerSidePropsResult, NextPage } from 'next'
import { FormCheckoutComponent, TitleUiComponent } from '../../../components'
import { getCountriesGql } from '../../../gql'
import { ShopLayout } from '../../../layouts'
import { TCountry } from '../../../store/features'
import { URL_API_GRAPHQL } from '../../../utils'
import { print } from 'graphql'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'

export interface INewAddresPage {
  countries: TCountry[]
}

const NewAddresPage: NextPage<INewAddresPage> = ({ countries }) => {
  const isError = useSelector((state: RootState) => state.address.isError)
  const message = useSelector((state: RootState) => state.address.message)

  return (
    <ShopLayout
      title={'Nueva dirección'}
      pageDescription={'Crear una nueva dirección'}
    >
      <TitleUiComponent>Dirección</TitleUiComponent>
      <p className='mb-5 -mt-10 prose-xl'>Crea una dirección de envio</p>
      {isError && (
        <div className='flex flex-row justify-center items-center my-3'>
          <div className='w-full md:w-[60%] text-center bg-red-600 rounded-full'>
            <p className='text-white'>{message}</p>
          </div>
        </div>
      )}
      <FormCheckoutComponent countries={countries} />
    </ShopLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  let res: GetServerSidePropsResult<INewAddresPage> = {
    props: { countries: [] }
  }

  const { data } = await axios.post(
    URL_API_GRAPHQL,
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

export default NewAddresPage
