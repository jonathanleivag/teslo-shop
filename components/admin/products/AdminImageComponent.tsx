import Image from 'next/image'
import { FC } from 'react'
import { UseFormGetValues, UseFormSetValue } from 'react-hook-form'
import Swal from 'sweetalert2'
import { IProductForm } from '../../../pages/admin/products/[slug]'

export interface IAdminImageComponent {
  getValues: UseFormGetValues<IProductForm>
  title: string
  setValue: UseFormSetValue<IProductForm>
}

export const AdminImageComponent: FC<IAdminImageComponent> = ({
  title,
  getValues,
  setValue
}) => {
  const handlerOnDelete = (img: string) => {
    Swal.fire({
      title: '¿Quieres eliminar la imagen?',
      confirmButtonColor: '#FF0000',
      showCancelButton: true,
      confirmButtonText: 'Eliminar'
    }).then(result => {
      if (result.isConfirmed) {
        setValue(
          'images',
          getValues().images.filter(image => image !== img),
          { shouldValidate: true }
        )
      }
    })
  }

  return (
    <>
      {getValues('images').map((image, index) => (
        <div
          key={index}
          className='w-full flex flex-col justify-center items-center gap-2'
        >
          <div className='w-[100px] h-[100px] relative'>
            <Image
              alt={`Imagen de producto ${title}`}
              src={image}
              layout='fill'
              objectFit='contain'
            />
          </div>
          <div className='w-full flex flex-row justify-center items-center'>
            <button
              type='button'
              onClick={() => handlerOnDelete(image)}
              className='w-full px-2 py-1 bg-red-600 rounded-lg text-white'
            >
              Borrar
            </button>
          </div>
        </div>
      ))}
    </>
  )
}
