import { FC } from 'react'
import { FieldError } from 'react-hook-form'

export interface IAdminErrorFormFormComponent {
  error: FieldError | undefined
}

export const AdminErrorFormFormComponent: FC<IAdminErrorFormFormComponent> = ({
  error
}) => {
  return (
    <>
      {error && (
        <div className='w-full flex flex-row justify-center items-center'>
          <div className='bg-red-600 w-[80%] rounded-full px-2'>
            <p className='text-white'> {error.message} </p>
          </div>
        </div>
      )}
    </>
  )
}
