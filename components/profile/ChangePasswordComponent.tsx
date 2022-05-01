import { FC } from 'react'
import { RiLockPasswordLine } from 'react-icons/ri'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { updatePasswordValidation } from '../../validations'
import Swal from 'sweetalert2'
import { axiosGraphqlUtils, Toast } from '../../utils'
import { updatePasswordGql } from '../../gql'
import { AdminErrorFormFormComponent } from '../admin'

export interface IChangePasswordComponent {
  id: string
}

export interface IChangePassword {
  password: string
  password0: string
  password1: string
}

export const ChangePasswordComponent: FC<IChangePasswordComponent> = ({
  id
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(updatePasswordValidation),
    defaultValues: {
      password: '',
      password0: '',
      password1: ''
    }
  })

  const updatePassword = async (data0: IChangePassword) => {
    try {
      const data = await axiosGraphqlUtils({
        query: updatePasswordGql,
        variables: {
          input: {
            id,
            ...data0
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
          title: data.data.updatePassword
        })
      }
    } catch (error) {
      Toast.fire({
        icon: 'error',
        title: 'Error al actualizar el usuario'
      })
    }
  }

  const handleOnSubmit = handleSubmit<IChangePassword>(data => {
    Swal.fire({
      title: '¿Quieres actualizar la contraseña?',
      confirmButtonColor: '#2563EB',
      showCancelButton: true,
      confirmButtonText: 'Actualizar'
    }).then(result => {
      if (result.isConfirmed) {
        updatePassword(data)
      }
    })
  })

  return (
    <div className='w-full flex flex-row justify-center items-center'>
      <form
        id='changePass'
        className='w-full sm:py-10 grid grid-cols-1 sm:w-[60%] sm:grid-cols-2 gap-4'
        onSubmit={handleOnSubmit}
      >
        <input
          className='hidden'
          type='text'
          name='username'
          id='username'
          autoComplete='username'
        />
        <div className='w-full flex flex-col gap-2 sm:col-span-2'>
          <label htmlFor='password'>Contraseña actual: </label>
          <input
            type='password'
            id='password'
            placeholder='Contraseña actual'
            className='input_form_product'
            autoComplete='current-password'
            {...register('password')}
          />
          <AdminErrorFormFormComponent error={errors.password} />
        </div>
        <div className='w-full flex flex-col gap-2'>
          <label htmlFor='password0'>Nueva contraseña: </label>
          <input
            type='password'
            id='password0'
            placeholder='Nueva contraseña'
            className='input_form_product'
            autoComplete='new-password'
            {...register('password0')}
          />
          <AdminErrorFormFormComponent error={errors.password0} />
        </div>
        <div className='w-full flex flex-col gap-2'>
          <label htmlFor='password1'>Repetir contraseña: </label>
          <input
            type='password'
            id='password1'
            placeholder='Repetir contraseña'
            className='input_form_product'
            autoComplete='new-password'
            {...register('password1')}
          />
          <AdminErrorFormFormComponent error={errors.password1} />
        </div>
        <div className='container_form_product items-center col-span-1 sm:col-span-2'>
          <button
            type='submit'
            className='w-full sm:w-[50%] h-10 rounded-full my-3 flex flex-row gap-2 justify-center items-center text-white bg-blue-600'
          >
            <RiLockPasswordLine />
            <span>Actualizar contraseña</span>
          </button>
        </div>
      </form>
    </div>
  )
}
