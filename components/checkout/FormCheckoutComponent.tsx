import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import Select from 'react-select'
import { countries } from '../../database/countries'
import { addDirection } from '../../store/features'

export type TCheckInputs = {
  name: string
  lastname: string
  address: string
  address0: string
  postalCode: string
  city: string
  phono: string
  country: string
}

export const FormCheckoutComponent: FC = () => {
  const [defaultValues] = useState<TCheckInputs>({
    name: Cookies.get('name') || '',
    lastname: Cookies.get('lastname') || '',
    address: Cookies.get('address') || '',
    address0: Cookies.get('address0') || '',
    postalCode: Cookies.get('postalCode') || '',
    city: Cookies.get('city') || '',
    phono: Cookies.get('phono') || '',
    country: Cookies.get('country')
      ? JSON.parse(Cookies.get('country')!)
      : countries[0]
  })
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue
  } = useForm<TCheckInputs>({ defaultValues })

  const router = useRouter()
  const dispatch = useDispatch()

  const onSubmit = handleSubmit(async input => {
    Cookies.set('name', input.name)
    Cookies.set('lastname', input.lastname)
    Cookies.set('address', input.address)
    Cookies.set('address0', input.address0)
    Cookies.set('postalCode', input.postalCode)
    Cookies.set('city', input.city)
    Cookies.set('phono', input.phono)
    Cookies.set('country', JSON.stringify(input.country))
    dispatch(addDirection())
    router.push('/checkout/summary')
  })

  return (
    <form
      onSubmit={onSubmit}
      className='w-[90%] grid grid-cols-1 md:grid-cols-2 gap-5'
    >
      {/* name */}
      <div className='w-full flex flex-col'>
        <label htmlFor='name'>Nombre</label>
        <input
          type='text'
          id='name'
          className='focus:outline-none border py-1 rounded-full my-2 px-2'
          placeholder='Nombre'
          {...register('name', { required: 'El nombre es requerido' })}
        />
        {errors.name?.message && (
          <div className='w-full h-8  py-1 rounded-full px-3 overflow-hidden bg-red-600'>
            <p className='text-white'> {errors.name.message} </p>
          </div>
        )}
      </div>

      {/* lastname */}
      <div className='w-full flex flex-col'>
        <label htmlFor='lastname'>Apellidos</label>
        <input
          type='text'
          id='lastname'
          className='focus:outline-none border py-1 rounded-full my-2 px-2'
          placeholder='Apellidos'
          {...register('lastname', { required: 'El apellido es requerido' })}
        />
        {errors.lastname?.message && (
          <div className='w-full h-8  py-1 rounded-full px-3 overflow-hidden bg-red-600'>
            <p className='text-white'> {errors.lastname.message} </p>
          </div>
        )}
      </div>

      {/* address */}
      <div className='w-full flex flex-col'>
        <label htmlFor='address'>Dirección</label>
        <input
          type='text'
          id='address'
          className='focus:outline-none border py-1 rounded-full my-2 px-2'
          placeholder='Dirección'
          {...register('address', { required: 'La dirección es requerida' })}
        />
        {errors.address?.message && (
          <div className='w-full h-8  py-1 rounded-full px-3 overflow-hidden bg-red-600'>
            <p className='text-white'> {errors.address.message} </p>
          </div>
        )}
      </div>

      {/* addressTwo */}
      <div className='w-full flex flex-col'>
        <label htmlFor='addressTwo'>Dirección 2 (opcional)</label>
        <input
          type='text'
          id='addressTwo'
          className='focus:outline-none border py-1 rounded-full my-2 px-2'
          placeholder='Dirección 2'
          {...register('address0')}
        />
        {errors.address0?.message && (
          <div className='w-full h-8  py-1 rounded-full px-3 overflow-hidden bg-red-600'>
            <p className='text-white'> {errors.address0.message} </p>
          </div>
        )}
      </div>

      {/* postalCode */}
      <div className='w-full flex flex-col'>
        <label htmlFor='postalCode'>Código postal</label>
        <input
          type='text'
          id='postalCode'
          className='focus:outline-none border py-1 rounded-full my-2 px-2'
          placeholder='Código postal'
          {...register('postalCode', {
            required: 'El cod. postal es requerido'
          })}
        />
        {errors.postalCode?.message && (
          <div className='w-full h-8  py-1 rounded-full px-3 overflow-hidden bg-red-600'>
            <p className='text-white'> {errors.postalCode.message} </p>
          </div>
        )}
      </div>

      {/* city */}
      <div className='w-full flex flex-col'>
        <label htmlFor='city'>Ciudad</label>
        <input
          type='text'
          id='city'
          className='focus:outline-none border py-1 rounded-full my-2 px-2'
          placeholder='Ciudad'
          {...register('city', { required: 'La ciudad es requerida' })}
        />
        {errors.city?.message && (
          <div className='w-full h-8  py-1 rounded-full px-3 overflow-hidden bg-red-600'>
            <p className='text-white'> {errors.city.message} </p>
          </div>
        )}
      </div>

      {/* country */}
      <div className='w-full flex flex-col'>
        <label htmlFor='selectbox'>País</label>
        <Select
          id='selectbox'
          instanceId='selectbox'
          placeholder='País'
          defaultValue={defaultValues.country}
          onChange={e => {
            setValue('country', e!)
          }}
          options={countries as any}
        />
        {errors.country?.message && (
          <div className='w-full h-8  py-1 rounded-full px-3 overflow-hidden bg-red-600'>
            <p className='text-white'> {errors.country.message} </p>
          </div>
        )}
      </div>

      {/* phono */}
      <div className='w-full flex flex-col'>
        <label htmlFor='phono'>Teléfono</label>
        <input
          type='text'
          id='phono'
          className='focus:outline-none border py-1 rounded-full my-2 px-2'
          placeholder='Teléfono'
          {...register('phono', { required: 'El tel es requerido' })}
        />
        {errors.phono?.message && (
          <div className='w-full h-8  py-1 rounded-full px-3 overflow-hidden bg-red-600'>
            <p className='text-white'> {errors.phono.message} </p>
          </div>
        )}
      </div>

      {/* button */}
      <div className='w-full flex flex-row justify-center items-center md:col-span-2 my-10'>
        <button
          type='submit'
          className='md:w-[30%] w-full p-1 rounded-full bg-blue-600 text-white'
        >
          Revisar pedido
        </button>
      </div>
    </form>
  )
}
