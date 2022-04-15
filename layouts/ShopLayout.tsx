import { FC, useEffect } from 'react'
import {
  HeaderMetaComponent,
  NavbarUiComponent,
  SidebarUiComponent
} from '../components'
import { useDispatch, useSelector } from 'react-redux'
import { IUserSlice, loadAddress, loginAction } from '../store/features'
import { RootState } from '../store/index'
import { useSession } from 'next-auth/react'

export interface IShopLayoutProps {
  title: string
  pageDescription: string
  imageFullUrl?: string
}

export const ShopLayout: FC<IShopLayoutProps> = ({
  title,
  pageDescription,
  imageFullUrl,
  children
}) => {
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user.user)
  const { data, status } = useSession()

  useEffect(() => {
    if (user?.id) {
      dispatch(loadAddress(user.id))
    } else {
      dispatch(loadAddress(''))
    }
    return () => {}
  }, [dispatch, user?.id])

  useEffect(() => {
    if (status === 'authenticated') {
      dispatch(loginAction(data.user as IUserSlice))
    }
    return () => {}
  }, [data, dispatch, status])

  return (
    <>
      <HeaderMetaComponent
        title={title}
        pageDescription={pageDescription}
        imageFullUrl={imageFullUrl}
      />
      <NavbarUiComponent />
      <SidebarUiComponent />
      <main className='mx-auto max-w-[1440px] py-[80px] px-2 md:px-[60px]'>
        {children}
      </main>
    </>
  )
}
