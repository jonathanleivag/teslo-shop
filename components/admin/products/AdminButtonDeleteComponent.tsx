import { FC } from 'react'
import Swal from 'sweetalert2'
import { deleteProductGql } from '../../../gql'
import { useSession0 } from '../../../hooks/useSession0'
import { axiosGraphqlUtils } from '../../../utils'
import { Toast } from '../../../utils/toastUtil'
import { useRouter } from 'next/router'

export interface IAdminButtonDeleteComponent {
  id: string
}

export const AdminButtonDeleteComponent: FC<IAdminButtonDeleteComponent> = ({
  id
}) => {
  const session = useSession0()
  const router = useRouter()

  const deleteProduct = async () => {
    try {
      const data = await axiosGraphqlUtils({
        query: deleteProductGql,
        variables: {
          input: {
            id,
            idUser: session?.user.id
          }
        }
      })

      if (!data.errors) {
        Toast.fire({
          icon: 'success',
          title: data.data.deleteProduct
        })
        router.replace('/admin/products')
      } else {
        Toast.fire({
          icon: 'error',
          title: data.errors[0].message
        })
      }
    } catch (error) {
      Toast.fire({
        icon: 'error',
        title: 'Error al eliminar el producto'
      })
    }
  }

  const handlerDeleteProduct = async () => {
    Swal.fire({
      title: '¿Quieres eliminar el producto?',
      confirmButtonColor: '#FF0000',
      showCancelButton: true,
      confirmButtonText: 'Eliminar'
    }).then(result => {
      if (result.isConfirmed) {
        deleteProduct()
      }
    })
  }

  return (
    <div className='w-full flex flex-row justify-end items-center'>
      <button
        type='button'
        onClick={handlerDeleteProduct}
        className='flex flex-row gap-2 justify-center items-center px-2 py-1 text-white bg-red-600 rounded-lg'
      >
        <span>Eliminar</span>
      </button>
    </div>
  )
}
