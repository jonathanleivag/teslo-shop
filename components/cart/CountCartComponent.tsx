import { FC, useState, useEffect } from 'react'
import { CountUiComponent } from '..'
import { ICartData, setInStock, updateQuantity } from '../../store/features'
import { useDispatch, useSelector } from 'react-redux'
import { FullScreenLoadingUiComponent } from '../ui'
import { RootState } from '../../store/index'
import { useSession0 } from '../../hooks/useSession0'

export interface ICountCartComponent {
  product: ICartData
}

export const CountCartComponent: FC<ICountCartComponent> = ({ product }) => {
  const [count, setCount] = useState(product.quantity)
  const [tempCartProduct, setTempCartProduct] = useState<ICartData>({
    id: product.id,
    image: product.image,
    price: product.price,
    size: product.size,
    slug: product.slug,
    title: product.title,
    quantity: product.quantity,
    gender: product.gender
  })

  const [copyTempCartProduct] = useState<ICartData>(tempCartProduct)
  const dispatch = useDispatch()
  const { inStock, loading } = useSelector((state: RootState) => state.product)
  const session = useSession0()

  useEffect(() => {
    dispatch(setInStock(tempCartProduct.id))
    return () => {}
  }, [dispatch, tempCartProduct.id])

  useEffect(() => {
    setTempCartProduct(p => ({ ...p, quantity: count }))
    return () => {}
  }, [count])

  useEffect(() => {
    if (copyTempCartProduct.quantity !== tempCartProduct.quantity) {
      dispatch(updateQuantity(tempCartProduct, session))
    }
    return () => {}
  }, [copyTempCartProduct.quantity, dispatch, session, tempCartProduct])

  if (loading) <FullScreenLoadingUiComponent />

  return (
    <div className='w-full my-2'>
      <CountUiComponent
        count={count}
        setCount={setCount}
        inStock={inStock!}
        setTempCartProduct={setTempCartProduct}
      />
    </div>
  )
}
