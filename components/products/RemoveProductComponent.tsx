import { FC } from 'react'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { useSession0 } from '../../hooks'
import { ICartData, removeProduct } from '../../store/features'

export interface IRemoveProductComponentProps {
  product: ICartData
}

export const RemoveProductComponent: FC<IRemoveProductComponentProps> = ({
  product
}) => {
  const dispatch = useDispatch()
  const session = useSession0()

  const handlerRemove = () => {
    Swal.fire({
      title: '¿Quieres remover este producto?',
      confirmButtonColor: '#2563EB',
      showCancelButton: true,
      confirmButtonText: 'Remover'
    }).then(result => {
      if (result.isConfirmed) {
        dispatch(removeProduct(product, session))
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
          title: 'Se removio el producto'
        })
      }
    })
  }
  return (
    <div className='w-full flex flex-row justify-end'>
      <button onClick={handlerRemove} className='text-sm text-blue-600'>
        Remove
      </button>
    </div>
  )
}
