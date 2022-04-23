import { useSession } from 'next-auth/react'
import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IUserSlice, loadOrderInCart, loginAction } from '../store/features'
import { RootState } from '../store/index'

export const LoadLayout: FC = ({ children }) => {
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user.user)
  const { data, status } = useSession()

  useEffect(() => {
    if (user?.id) {
      dispatch(loadOrderInCart(user.id))
    }
    return () => {}
  }, [dispatch, user?.id])

  useEffect(() => {
    if (status === 'authenticated') {
      dispatch(loginAction(data.user as IUserSlice))
    }
    return () => {}
  }, [data, dispatch, status])
  return <> {children} </>
}
