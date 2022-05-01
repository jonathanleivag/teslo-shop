import { GetServerSideProps, GetServerSidePropsResult, NextPage } from 'next'
import { getSession } from 'next-auth/react'
import { ProfileFormInfoComponent, TitleUiComponent } from '../../components'
import { ILogin } from '../../interfaces'
import { ShopLayout } from '../../layouts'
import { axiosGraphqlUtils } from '../../utils'
import { getOneUserGql } from '../../gql'
import { IUser } from '../../store/features'

export interface IProfilePageProps {
  user: IUser
  type: ESessionType
}

export type ESessionType = 'auth0' | 'email'

const ProfilePage: NextPage<IProfilePageProps> = ({ user, type }) => {
  return (
    <ShopLayout title={'Perfil'} pageDescription={'Información de usuario'}>
      <TitleUiComponent>Información de usuario</TitleUiComponent>
      <p className='mb-5 -mt-10 prose-xl'>
        Aquí podras modificar la información personal
      </p>
      <ProfileFormInfoComponent user={user} />
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
      }
    })

    if (!data.errors) {
      resp = {
        props: {
          user: data.data.getOneUser.user,
          type: data.data.getOneUser.type
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
