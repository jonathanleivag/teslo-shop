import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSession0 } from '../../hooks/useSession0'
import { addToCart, ICartData } from '../../store/features'
import { Toast } from '../../utils'

export interface IButtonProductComponent {
  inStock: number
  tempCartProduct: ICartData
  selected: boolean
}

export const ButtonAddProductComponent: FC<IButtonProductComponent> = ({
  inStock,
  tempCartProduct,
  selected
}) => {
  const [text, setText] = useState<string>('')
  const dispatch = useDispatch()
  const session = useSession0()
  const route = useRouter()

  useEffect(() => {
    setText(selected ? 'Actualizar carrito' : 'Agregar al carro')
    return () => {}
  }, [selected])

  const addToCard = async () => {
    try {
      dispatch(addToCart(tempCartProduct, session))

      Toast.fire({
        icon: 'success',
        iconColor: '#2563EB',
        title: `${tempCartProduct.title} agregado al carrito`
      })
    } catch (error) {
      //
    }
  }

  const redirect = () => {
    if (tempCartProduct.size) {
      route.push(
        `/auth/login?redirect=${route.asPath}${
          tempCartProduct.quantity || tempCartProduct.size ? '?' : ''
        }${
          tempCartProduct.quantity ? `quantity=${tempCartProduct.quantity}` : ''
        }${tempCartProduct.quantity && tempCartProduct.size ? '&' : ''}${
          tempCartProduct.size ? `size=${tempCartProduct.size}` : ''
        }`
      )
    } else {
      route.push(`/auth/login/?redirect=${route.asPath}`)
    }
  }

  const handleAddToCart = () => {
    if (tempCartProduct.quantity > 0 && tempCartProduct.size) {
      if (session) addToCard()
      else redirect()
    }
  }

  return (
    <>
      {inStock !== 0 && (
        <button
          onClick={handleAddToCart}
          className={`p-2 ${
            tempCartProduct.quantity > 0 && tempCartProduct.size
              ? 'bg-blue-600 text-white'
              : 'border-blue-600 border text-blue-600 cursor-not-allowed'
          } w-full rounded-full my-5`}
        >
          {tempCartProduct.quantity > 0 && tempCartProduct.size
            ? text
            : 'Seleccione una talla'}
        </button>
      )}
      {inStock === 0 && (
        <button className='p-2 border border-red-600 w-full text-red-600 rounded-full my-5 cursor-not-allowed'>
          No hay disponible
        </button>
      )}
    </>
  )
}
