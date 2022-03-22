import { FC } from 'react'
import Select from 'react-select'

const options = [
  { value: 'Chile', label: 'Chile' },
  { value: 'Argentina', label: 'Argentina' },
  { value: 'Colombia', label: 'Colombia' }
]

export const FormCheckoutComponent: FC = () => {
  return (
    <form className='w-[90%] grid grid-cols-1 md:grid-cols-2 gap-5'>
      {/* name */}
      <div className='w-full flex flex-col'>
        <label htmlFor='name'>Nombre</label>
        <input
          type='text'
          name='name'
          id='name'
          className='focus:outline-none border py-1 rounded-full my-2 px-2'
          placeholder='Nombre'
        />
      </div>

      {/* lastname */}
      <div className='w-full flex flex-col'>
        <label htmlFor='lastname'>Apellidos</label>
        <input
          type='text'
          name='lastname'
          id='lastname'
          className='focus:outline-none border py-1 rounded-full my-2 px-2'
          placeholder='Apellidos'
        />
      </div>

      {/* address */}
      <div className='w-full flex flex-col'>
        <label htmlFor='address'>Dirección</label>
        <input
          type='text'
          name='address'
          id='address'
          className='focus:outline-none border py-1 rounded-full my-2 px-2'
          placeholder='Dirección'
        />
      </div>

      {/* addressTwo */}
      <div className='w-full flex flex-col'>
        <label htmlFor='addressTwo'>Dirección 2 (opcional)</label>
        <input
          type='text'
          name='addressTwo'
          id='addressTwo'
          className='focus:outline-none border py-1 rounded-full my-2 px-2'
          placeholder='Dirección 2'
        />
      </div>

      {/* postalCode */}
      <div className='w-full flex flex-col'>
        <label htmlFor='postalCode'>Código postal</label>
        <input
          type='text'
          name='postalCode'
          id='postalCode'
          className='focus:outline-none border py-1 rounded-full my-2 px-2'
          placeholder='Código postal'
        />
      </div>

      {/* city */}
      <div className='w-full flex flex-col'>
        <label htmlFor='city'>Ciudad</label>
        <input
          type='text'
          name='city'
          id='city'
          className='focus:outline-none border py-1 rounded-full my-2 px-2'
          placeholder='Ciudad'
        />
      </div>

      {/* country */}
      <div className='w-full flex flex-col'>
        <label htmlFor='country'>País</label>
        <Select placeholder='País' options={options} />
      </div>

      {/* phono */}
      <div className='w-full flex flex-col'>
        <label htmlFor='phono'>Teléfono</label>
        <input
          type='text'
          name='phono'
          id='phono'
          className='focus:outline-none border py-1 rounded-full my-2 px-2'
          placeholder='Teléfono'
        />
      </div>

      {/* button */}
      <div className='w-full flex flex-row justify-center items-center md:col-span-2 my-10'>
        <button className='md:w-[30%] w-full p-1 rounded-full bg-blue-600 text-white'>
          Revisar pedido
        </button>
      </div>
    </form>
  )
}
