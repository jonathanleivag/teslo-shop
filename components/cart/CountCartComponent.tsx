import { FC, useState, useEffect } from 'react'
import { CountUiComponent } from '..'
import { ICartData, updateQuantity } from '../../store/features'
import { useDispatch } from 'react-redux'
import { useProductStock } from '../../hooks'
import { FullScreenLoadingUiComponent } from '../ui'

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
  const { inStock, isLoading } = useProductStock({}, tempCartProduct.id)
  useEffect(() => {
    setTempCartProduct(p => ({ ...p, quantity: count }))
    return () => {}
  }, [count])

  useEffect(() => {
    if (copyTempCartProduct.quantity !== tempCartProduct.quantity) {
      dispatch(updateQuantity(tempCartProduct))
    }
    return () => {}
  }, [copyTempCartProduct.quantity, dispatch, tempCartProduct])

  if (isLoading) <FullScreenLoadingUiComponent />

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
