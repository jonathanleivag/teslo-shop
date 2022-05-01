import { FC } from 'react'
import { RiLockPasswordLine } from 'react-icons/ri'

export const ChangePasswordComponent: FC = () => {
  return (
    <div className='w-full flex flex-row justify-center items-center'>
      <form
        id='changePass'
        className='w-full sm:py-10 grid grid-cols-1 sm:w-[60%] sm:grid-cols-2 gap-4'
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
          />
        </div>
        <div className='w-full flex flex-col gap-2'>
          <label htmlFor='password0'>Nueva contraseña: </label>
          <input
            type='password'
            id='password0'
            placeholder='Nueva contraseña'
            className='input_form_product'
            autoComplete='new-password'
          />
        </div>
        <div className='w-full flex flex-col gap-2'>
          <label htmlFor='password1'>Repetir contraseña: </label>
          <input
            type='password'
            id='password1'
            placeholder='Repetir contraseña'
            className='input_form_product'
            autoComplete='new-password'
          />
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
