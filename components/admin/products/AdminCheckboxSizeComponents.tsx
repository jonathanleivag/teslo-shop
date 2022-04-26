import { ChangeEvent, Dispatch, FC, SetStateAction, useEffect } from 'react'
import { FieldError, UseFormSetValue } from 'react-hook-form'
import { IProduct, TValidSize } from '../../../interfaces'

export interface IAdminCheckboxSizeComponents {
  checkbox: TValidSize[]
  setValue: UseFormSetValue<IProduct>
  setErrorCheckbox: Dispatch<SetStateAction<FieldError | undefined>>
}

const validSizes: TValidSize[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']

export const AdminCheckboxSizeComponents: FC<IAdminCheckboxSizeComponents> = ({
  checkbox,
  setValue,
  setErrorCheckbox
}) => {
  useEffect(() => {
    if (checkbox.length === 0) {
      setErrorCheckbox({
        message: 'Debe seleccionar al menos una talla',
        type: 'required'
      })
    } else {
      setErrorCheckbox(undefined)
    }

    return () => {}
  }, [checkbox.length, setErrorCheckbox])

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (checkbox.includes(event.target.id as TValidSize)) {
      setValue(
        'sizes',
        checkbox.filter(size => size !== event.target.id),
        { shouldValidate: true }
      )
    } else {
      setValue('sizes', [...checkbox, event.target.id as TValidSize], {
        shouldValidate: true
      })
    }
  }

  return (
    <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2'>
      {validSizes.map(size => (
        <div className='flex flex-row items-center gap-2' key={size}>
          <input
            checked={checkbox.includes(size)}
            onChange={onChange}
            type='checkbox'
            id={size}
            value={size}
            className='cursor-pointer'
          />
          <label className='cursor-pointer' htmlFor={size}>
            {' '}
            {size}{' '}
          </label>
        </div>
      ))}
    </div>
  )
}
