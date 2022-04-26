import { ChangeEvent, FC } from 'react'
import { UseFormSetValue } from 'react-hook-form'
import { IProduct, TValidType } from '../../../interfaces'

export interface IAdminRadioButtonTypeComponentProps {
  typeSelect: TValidType
  setValue: UseFormSetValue<IProduct>
}

export interface IValidTypeComponent {
  name: string
  value: TValidType
}

const validTypes: IValidTypeComponent[] = [
  { name: 'Camisa', value: 'shirts' },
  { name: 'Pantalones', value: 'pants' },
  { name: 'Poleron', value: 'hoodies' },
  { name: 'Gorros', value: 'hats' }
]

export const AdminRadioButtonTypeComponent: FC<IAdminRadioButtonTypeComponentProps> = ({
  typeSelect,
  setValue
}) => {
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue('type', event.target.id as TValidType, { shouldValidate: true })
  }

  return (
    <div className='grid_container_radio_button_produts'>
      {validTypes.map(type => (
        <div key={type.value} className='container_radio_button_type_products'>
          <input
            checked={typeSelect === type.value}
            onChange={onChange}
            type='radio'
            id={type.value}
            name={'type'}
            className='cursor-pointer'
          />
          <label className='cursor-pointer' htmlFor={type.value}>
            {type.name}
          </label>
        </div>
      ))}
    </div>
  )
}
