import { GetServerSideProps, GetServerSidePropsResult, NextPage } from 'next'
import { getSession } from 'next-auth/react'
import {
  ChangePasswordComponent,
  HistoryCheckoutComponent,
  ProfileFormInfoComponent,
  TCheckInputs,
  TitleUiComponent
} from '../../components'
import { ILogin } from '../../interfaces'
import { ShopLayout } from '../../layouts'
import { axiosGraphqlUtils, URL_API_GRAPHQL } from '../../utils'
import { getAddressByUserGql, getOneUserGql } from '../../gql'
import { IUser, selectedAddressAction } from '../../store/features'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

export interface IProfilePageProps {
  user: IUser
  type: ESessionType
  address: TCheckInputs[]
}

export type ESessionType = 'auth0' | 'email'

const ProfilePage: NextPage<IProfilePageProps> = ({ user, type, address }) => {
  const dispatch = useDispatch()
  const router = useRouter()

  const newAddress = () => {
    dispatch(selectedAddressAction(undefined))
    router.push('/profile/address/new')
  }
  return (
    <ShopLayout title={'Perfil'} pageDescription={'Información de usuario'}>
      <TitleUiComponent>Información de usuario</TitleUiComponent>
      <p className='mb-5 -mt-10 prose-xl'>
        Aquí podras modificar la información personal
      </p>
      <ProfileFormInfoComponent user={user} />
      {type === 'email' && <ChangePasswordComponent id={user.id} />}
      <p className='mb-5 my-5 prose-xl'>
        Aquí podras modificar la dirección del usuario
      </p>
      <HistoryCheckoutComponent noSelected address={address} />
      {address.length < 3 && (
        <div className='w-full flex flex-row justify-center items-center'>
          <button
            onClick={newAddress}
            className='p-1 text-blue-600 border border-blue-600 rounded-full'
          >
            Nueva dirección
          </button>
        </div>
      )}
    </ShopLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const session = await getSession({ req: ctx.req })
  const user = session?.user as ILogin

  let resp: GetServerSidePropsResult<IProfilePageProps | {}> = {
    props: {}
  }
  const error = {
    redirect: {
      destination: '/auth/login?redirect=/profile',
      permanent: false
    }
  }

  if (session) {
    const data = await axiosGraphqlUtils({
      query: getOneUserGql,
      variables: {
        idUser: user.user.id
      },
      url: URL_API_GRAPHQL
    })

    const data0 = await axiosGraphqlUtils({
      query: getAddressByUserGql,
      variables: { idUser: user.user.id },
      url: URL_API_GRAPHQL
    })

    if (!data.errors && !data0.errors) {
      resp = {
        props: {
          user: data.data.getOneUser.user,
          type: data.data.getOneUser.type,
          address: data0.data.getAddressesByUser
        }
      }
    } else {
      resp = error
    }
  } else {
    resp = error
  }

  return resp
}

export default ProfilePage
