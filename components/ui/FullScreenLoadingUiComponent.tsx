import { FC } from 'react'

export const FullScreenLoadingUiComponent: FC = () => {
  return (
    <section className='h-[calc(100vh-300px)] w-full flex flex-col justify-center items-center'>
      <h2 className='font-light text-[#ccc]'>Cargando</h2>
      <div className='lds-dual-ring' />
    </section>
  )
}
