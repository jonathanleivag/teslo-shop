import { FC } from 'react'

export const SummaryResumePersonalComponent: FC = () => {
  return (
    <>
      <div className='w-full border-b mb-3'>
        <h4 className='font-bold'>Dirección de entrega</h4>
        <div className='w-full flex flex-row justify-end'>
          <a className='text-sm text-blue-600'>Editar</a>
        </div>
        <div className='w-full flex flex-row'>
          <div className='w-1/2 flex flex-row justify-start'>Nombre:</div>
          <div className='w-1/2 flex flex-row justify-end'>Jonathan</div>
        </div>

        <div className='w-full flex flex-row'>
          <div className='w-1/2 flex flex-row justify-start'>Apellidos:</div>
          <div className='w-1/2 flex flex-row justify-end'>Leiva Gómez</div>
        </div>
        <div className='w-full flex flex-row'>
          <div className='w-1/2 flex flex-row justify-start'>Dirección:</div>
          <div className='w-1/2 flex flex-row justify-end'>Camino padre...</div>
        </div>
        <div className='w-full flex flex-row'>
          <div className='w-1/2 flex flex-row justify-start'>
            Código postal:
          </div>
          <div className='w-1/2 flex flex-row justify-end'>123456</div>
        </div>
        <div className='w-full flex flex-row'>
          <div className='w-1/2 flex flex-row justify-start'>País:</div>
          <div className='w-1/2 flex flex-row justify-end'>Chile</div>
        </div>
        <div className='w-full flex flex-row'>
          <div className='w-1/2 flex flex-row justify-start'>Phone:</div>
          <div className='w-1/2 flex flex-row justify-end'>1234567889</div>
        </div>
      </div>
      <h4 className='font-bold'>Productos</h4>
    </>
  )
}
