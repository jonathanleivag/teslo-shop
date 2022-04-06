import { FC, useEffect } from 'react'
import {
  HeaderMetaComponent,
  NavbarUiComponent,
  SidebarUiComponent
} from '../components'
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux'
import {
  addCookies,
  addDirection,
  changeOrdenSummary,
  IUserSlice,
  loginAction
} from '../store/features'
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
  const cart = useSelector((state: RootState) => state.cart.cart)
  const { data, status } = useSession()

  useEffect(() => {
    try {
      const productCookies = Cookies.get('cart')
        ? JSON.parse(Cookies.get('cart')!)
        : []
      dispatch(addCookies(productCookies))
    } catch (error) {
      dispatch(addCookies([]))
    }

    return () => {}
  }, [dispatch])

  useEffect(() => {
    Cookies.set('cart', JSON.stringify(cart))
    return () => {}
  }, [cart])

  useEffect(() => {
    dispatch(changeOrdenSummary())
    return () => {}
  }, [cart, dispatch])

  useEffect(() => {
    dispatch(addDirection())
    return () => {}
  }, [dispatch])

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
