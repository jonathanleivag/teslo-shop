import Link from 'next/link'
import { FC } from 'react'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import {
  CountCartComponent,
  ICardListCartComponentProps,
  ImageUiComponent
} from '..'
import { ICartData, removeProduct } from '../../store/features'
import { useSession0 } from '../../hooks/useSession0'

export interface ICardCartComponent extends ICardListCartComponentProps {
  product: ICartData
}

export const CardCartComponent: FC<ICardCartComponent> = ({
  product,
  edit
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
    <div className='w-full flex flex-row min-h-[7rem]'>
      <div className='w-[20%] min-h-[7rem] relative'>
        <Link
          href={{
            pathname: `/product/${product.slug}`,
            query: { size: product.size, quantity: product.quantity }
          }}
          passHref
        >
          <a>
            <ImageUiComponent
              image={product.image}
              description={product.title}
            />
          </a>
        </Link>
      </div>
      <div className='w-[60%] h-full px-5 flex flex-col'>
        <h2> {product.title} </h2>
        <p className='text-sm'>
          Talla: <span className='font-bold'>{product.size}</span>
        </p>
        {edit && <CountCartComponent product={product} />}

        {!edit && (
          <p>
            {product.quantity} {product.quantity > 1 ? 'productos' : 'producto'}
          </p>
        )}
      </div>
      <div className='w-[20%] h-full flex flex-col items-center justify-start pt-2'>
        <p className='font-bold'>${product.price} </p>
        {edit && (
          <button onClick={handlerRemove} className='text-blue-600 text-xs'>
            Remover
          </button>
        )}
      </div>
    </div>
  )
}
