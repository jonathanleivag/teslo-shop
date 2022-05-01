import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import { IAddressPageProps } from '../../pages/checkout/address'
import { RootState } from '../../store/index'
import { addAddress, editAddress, TCountry } from '../../store/features'

export type TCheckInputs = {
  id: string
  address: string
  address0: string
  postalCode: string
  city: string
  phono: string
  country: TCountry
}

export const FormCheckoutComponent: FC<IAddressPageProps> = ({ countries }) => {
  const selectedAddress = useSelector(
    (state: RootState) => state.address.selectedAddress
  )
  const [defaultValues] = useState<TCheckInputs>({
    id: selectedAddress?.id || '',
    address: selectedAddress?.address || '',
    address0: selectedAddress?.address0 || '',
    postalCode: selectedAddress?.postalCode || '',
    city: selectedAddress?.city || '',
    phono: selectedAddress?.phono || '',
    country: selectedAddress?.country || countries[0]
  })
  const [editSelected, setEditSelected] = useState<string | boolean>(false)
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue
  } = useForm<TCheckInputs>({ defaultValues })

  const [buttonText, setButtonText] = useState<string>('Siguiente')

  const userId = useSelector((state: RootState) => state.user.user?.id)

  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    const { edit = null } = router.query
    if (edit === null) {
      setEditSelected(false)
    } else {
      setEditSelected(edit.toString())
    }
    return () => {}
  }, [router.query])

  useEffect(() => {
    if (router.pathname.split('/')[1] === 'profile') {
      setButtonText('Guardar')
    } else {
      setButtonText('Siguiente')
    }
    return () => {}
  }, [router.pathname])

  const onSubmit = handleSubmit(async input => {
    const { address, address0, postalCode, city, phono, country } = input

    const { edit = null } = router.query

    if (edit === null) {
      setEditSelected(false)
      dispatch(
        addAddress(
          {
            address,
            address0,
            postalCode,
            city,
            phono,
            country
          },
          userId!,
          router
        )
      )
    } else {
      setEditSelected(edit.toString())
      dispatch(
        editAddress(
          {
            address,
            address0,
            postalCode,
            city,
            phono,
            country
          },
          selectedAddress?.id!,
          userId!,
          router
        )
      )
    }
  })

  return (
    <form
      onSubmit={onSubmit}
      className='w-[90%] grid grid-cols-1 md:grid-cols-2 gap-5'
    >
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
            const event: any = e
            setValue('country', event)
          }}
          options={countries as any}
        />
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
          {editSelected === 'addressEdit' ? 'Editar dirección' : buttonText}
        </button>
      </div>
    </form>
  )
}
