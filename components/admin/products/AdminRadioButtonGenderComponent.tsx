import { ChangeEvent, FC } from 'react'
import { UseFormSetValue } from 'react-hook-form'
import { TGender } from '../../../interfaces'
import { IProductForm } from '../../../pages/admin/products/[slug]'

export interface IAdminRadioButtonGenderComponentProps {
  genderSelect: TGender
  setValue: UseFormSetValue<IProductForm>
}

export interface IValidGenderComponent {
  name: string
  value: TGender
}

const validGender: IValidGenderComponent[] = [
  { name: 'Mujer', value: 'woman' },
  { name: 'Hombre', value: 'men' },
  { name: 'Niño', value: 'kid' },
  { name: 'unisex', value: 'unisex' }
]

export const AdminRadioButtonGenderComponent: FC<IAdminRadioButtonGenderComponentProps> = ({
  genderSelect,
  setValue
}) => {
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue('gender', event.target.id as TGender, { shouldValidate: true })
  }
  return (
    <div className='grid_container_radio_button_produts'>
      {validGender.map(gender => (
        <div
          key={gender.value}
          className='container_radio_button_type_products'
        >
          <input
            checked={genderSelect === gender.value}
            onChange={onChange}
            type='radio'
            id={gender.value}
            name={'gender'}
            className='cursor-pointer'
          />
          <label className='cursor-pointer' htmlFor={gender.value}>
            {' '}
            {gender.name}{' '}
          </label>
        </div>
      ))}
    </div>
  )
}
