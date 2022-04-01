import { FC, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { addToCart, ICartData } from '../../store/features'

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

  useEffect(() => {
    setText(selected ? 'Actualizar carrito' : 'Agregar al carro')
    return () => {}
  }, [selected])

  const handleAddToCart = () => {
    if (tempCartProduct.quantity > 0 && tempCartProduct.size) {
      dispatch(addToCart(tempCartProduct))
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: toast => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'success',
        iconColor: '#2563EB',
        title: `${tempCartProduct.title} agregado al carrito`
      })
    }
  }

  return (
    <>
      {inStock !== 0 && (
        <button
          onClick={handleAddToCart}
          className={`p-2 my-2 ${
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
