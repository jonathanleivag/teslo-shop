import { GetServerSideProps, NextPage, GetServerSidePropsResult } from 'next'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import {
  HistoryCheckoutComponent,
  TCheckInputs,
  TitleUiComponent
} from '../../../components'
import { getAddressByUserGql, numberOfItemGql } from '../../../gql'
import { ILogin } from '../../../interfaces'
import { ShopLayout } from '../../../layouts'
import { RootState } from '../../../store'
import { selectedAddressAction } from '../../../store/features'
import { axiosGraphqlUtils, URL_API_GRAPHQL } from '../../../utils'
import { FullScreenLoadingUiComponent } from '../../../components/ui/FullScreenLoadingUiComponent'

const titleAndDescription: string = 'Historial de direcciones'

export interface IHistoryPageProps {
  address: TCheckInputs[]
}

const HistoryPage: NextPage<IHistoryPageProps> = ({ address }) => {
  const selectedAddress = useSelector(
    (state: RootState) => state.address.selectedAddress
  )
  const loading = useSelector((state: RootState) => state.address.loading)
  const router = useRouter()
  const dispatch = useDispatch()

  const newAddress = () => {
    dispatch(selectedAddressAction(undefined))
    router.push('/checkout/address')
  }

  if (loading) return <FullScreenLoadingUiComponent />

  return (
    <ShopLayout
      title={titleAndDescription}
      pageDescription={titleAndDescription}
    >
      <TitleUiComponent>Historial de Direcciónes</TitleUiComponent>
      <p className='mb-5 -mt-10 prose-xl'>Usar una dirección para envio</p>
      <HistoryCheckoutComponent address={address} />
      <div className='w-full flex flex-row justify-center my-3'>
        <div
          className={`w-full md:w-[40%] grid grid-cols-1 ${
            address.length < 3 || selectedAddress === undefined
              ? 'md:grid-cols-2'
              : 'md:grid-cols-1'
          } gap-4`}
        >
          {address.length < 3 && (
            <button
              onClick={newAddress}
              className='p-1 text-blue-600 border border-blue-600 rounded-full'
            >
              Nueva dirección
            </button>
          )}
          {selectedAddress?.address && (
            <button
              onClick={() => router.push('/checkout/summary')}
              className='p-1 text-white bg-blue-600 rounded-full'
            >
              Siguiente
            </button>
          )}
        </div>
      </div>
    </ShopLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  let address: TCheckInputs[] = []
  let resp: GetServerSidePropsResult<IHistoryPageProps> = {
    props: { address }
  }
  const session = await getSession({ req: ctx.req })
  const user = session?.user as ILogin

  const data = await axiosGraphqlUtils({
    query: getAddressByUserGql,
    variables: { idUser: user.user.id },
    url: URL_API_GRAPHQL
  })

  const data0 = await axiosGraphqlUtils({
    query: numberOfItemGql,
    variables: { idUser: user.user.id },
    url: URL_API_GRAPHQL
  })

  if (data.errors || data0.errors) {
    address = []
    resp = { redirect: { destination: '/checkout/address', permanent: false } }
  } else {
    if (data0.data.loadOrderInCart.numberOfItem === 0) {
      resp = { redirect: { destination: '/', permanent: false } }
    } else {
      if (data.data.getAddressesByUser.length === 0) {
        resp = {
          redirect: { destination: '/checkout/address', permanent: false }
        }
      } else {
        resp = { props: { address: data.data.getAddressesByUser } }
      }
    }
  }

  return resp
}

export default HistoryPage
