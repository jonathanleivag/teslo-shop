import { FC, useEffect } from 'react'
import {
  HeaderMetaComponent,
  NavbarUiComponent,
  SidebarUiComponent
} from '../components'
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { addCookies, changeOrdenSummary, loginAction } from '../store/features'
import { RootState } from '../store/index'
import { axiosGraphqlUtils } from '../utils'
import { checkTokenGql } from '../gql'

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
    const checkToken = async () => {
      try {
        const data = await axiosGraphqlUtils({ query: checkTokenGql })
        if (data.errors) {
          Cookies.remove('token')
          Cookies.remove('user')
          dispatch(
            loginAction({
              token: undefined,
              user: undefined
            })
          )
        } else {
          Cookies.set('user', JSON.stringify(data.data.checkToken.user))
          Cookies.set('token', data.data.checkToken.token)
          dispatch(
            loginAction({
              token: data.data.checkToken.token,
              user: data.data.checkToken.user
            })
          )
        }
      } catch (error) {
        console.error(error)
      }
    }

    checkToken()

    return () => {}
  }, [dispatch])

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
