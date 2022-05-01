import { yupResolver } from '@hookform/resolvers/yup'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineEdit } from 'react-icons/ai'
import Swal from 'sweetalert2'
import { updateUserGql } from '../../gql'
import { IUser } from '../../store/features'
import { axiosGraphqlUtils, Toast } from '../../utils'
import { updateUserValidation } from '../../validations'
import { AdminErrorFormFormComponent } from '../admin'

export interface IProfileFormInfoComponent {
  user: IUser
}

export const ProfileFormInfoComponent: FC<IProfileFormInfoComponent> = ({
  user
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm({
    defaultValues: user,
    resolver: yupResolver(updateUserValidation),
    mode: 'onChange'
  })

  const updateUser = async (data0: IUser) => {
    try {
      const data = await axiosGraphqlUtils({
        query: updateUserGql,
        variables: {
          input: {
            id: data0.id,
            name: data0.name,
            email: data0.email
          }
        }
      })

      if (data.errors) {
        Toast.fire({
          icon: 'error',
          title: data.errors[0].message
        })
      } else {
        Toast.fire({
          icon: 'success',
          iconColor: '#2563EB',
          title: data.data.updateUser
        })
      }
    } catch (error) {
      Toast.fire({
        icon: 'error',
        title: 'Error al actualizar el usuario'
      })
    }
  }

  const onSubmit = handleSubmit(async (data: IUser) => {
    Swal.fire({
      title: '¿Quieres actualizar los datos?',
      confirmButtonColor: '#2563EB',
      showCancelButton: true,
      confirmButtonText: 'Actualizar'
    }).then(result => {
      if (result.isConfirmed) {
        updateUser(data)
      }
    })
  })

  return (
    <div className='w-full flex flex-row justify-center items-center'>
      <form
        className='w-full sm:py-10 grid grid-cols-1 sm:w-[60%] sm:grid-cols-2 gap-4'
        onSubmit={onSubmit}
      >
        <div className='w-full flex flex-col gap-2'>
          <label htmlFor='name'>Nombre: </label>
          <input
            type='text'
            id='name'
            placeholder='Nombre de usuario'
            className='input_form_product'
            {...register('name')}
          />
          <AdminErrorFormFormComponent error={errors.name} />
        </div>
        <div className='w-full flex flex-col'>
          <label htmlFor='name'>rol: </label>
          <input
            type='text'
            name='rol'
            id='rol'
            value={user.role}
            placeholder='Rol de usuario'
            className='input_form_product cursor-not-allowed text-gray-400'
            disabled
          />
        </div>
        <div className='w-full flex flex-col sm:col-span-2 gap-2'>
          <label htmlFor='email'>email: </label>
          <input
            type='email'
            id='email'
            placeholder='Email de usuario'
            className='input_form_product'
            {...register('email')}
          />
          <AdminErrorFormFormComponent error={errors.email} />
        </div>
        <div className='container_form_product items-center col-span-1 sm:col-span-2'>
          <button
            type='submit'
            className='w-full sm:w-[40%] h-10 rounded-full my-3 flex flex-row gap-2 justify-center items-center text-white bg-blue-600'
          >
            <AiOutlineEdit />
            <span>Actualizar</span>
          </button>
        </div>
      </form>
    </div>
  )
}
