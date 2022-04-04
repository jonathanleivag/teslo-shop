import Link from 'next/link'
import { FC } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'

export const SummaryResumePersonalComponent: FC = () => {
  const direction = useSelector((state: RootState) => state.direcition)

  if (direction.name === '') return <></>

  return (
    <>
      <div className='w-full border-b mb-3'>
        <h4 className='font-bold'>Dirección de entrega</h4>

        <div className='w-full flex flex-row justify-end'>
          <Link href='/checkout/address'>
            <a className='text-sm text-blue-600'>Editar</a>
          </Link>
        </div>

        <div className='w-full flex flex-row'>
          <div className='w-1/2 flex flex-row justify-start'>Nombre:</div>
          <div className='w-1/2 flex flex-row justify-end'>
            {direction.name}
          </div>
        </div>

        <div className='w-full flex flex-row'>
          <div className='w-1/2 flex flex-row justify-start'>Apellidos:</div>
          <div className='w-1/2 flex flex-row justify-end'>
            {direction.lastname}
          </div>
        </div>

        <div className='w-full flex flex-row'>
          <div className='w-1/2 flex flex-row justify-start'>Dirección:</div>
          <div className='w-1/2 flex flex-row justify-end'>
            {direction.address.length > 10
              ? direction.address.substring(0, 10) + '...'
              : direction.address}
          </div>
        </div>

        {direction.address0 !== '' && (
          <div className='w-full flex flex-row'>
            <div className='w-1/2 flex flex-row justify-start'>
              Dirección 2:
            </div>
            <div className='w-1/2 flex flex-row justify-end'>
              {direction.address0.length > 10
                ? direction.address0.substring(0, 10) + '...'
                : direction.address0}
            </div>
          </div>
        )}

        <div className='w-full flex flex-row'>
          <div className='w-1/2 flex flex-row justify-start'>
            Código postal:
          </div>
          <div className='w-1/2 flex flex-row justify-end'>
            {direction.postalCode}
          </div>
        </div>

        <div className='w-full flex flex-row'>
          <div className='w-1/2 flex flex-row justify-start'>País:</div>
          <div className='w-1/2 flex flex-row justify-end'>
            {JSON.parse(direction.country).label}
          </div>
        </div>

        <div className='w-full flex flex-row'>
          <div className='w-1/2 flex flex-row justify-start'>Phone:</div>
          <div className='w-1/2 flex flex-row justify-end'>
            {direction.phono}
          </div>
        </div>
      </div>
      <h4 className='font-bold'>Productos</h4>
    </>
  )
}
