import { FC } from 'react'
import { IconType } from 'react-icons'

export interface IButtonProductSlugComponent {
  Icon: IconType
}

export const ButtonProductSlugComponent: FC<IButtonProductSlugComponent> = ({
  Icon
}) => <Icon className='text-[40px] text-[rgba(0,0,0,.3)]' />
