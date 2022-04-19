import { FC } from 'react'
import { IconType } from 'react-icons'

export interface AdminSummaryTileProps {
  title: string
  subTitle: string
  Icon: IconType
  classNameIcon?: string
}

export const AdminSummaryTileComponent: FC<AdminSummaryTileProps> = ({
  title,
  subTitle,
  Icon,
  classNameIcon = ''
}) => {
  return (
    <div className='w-full h-32 rounded-xl shadow-md flex flex-row'>
      <div className='w-[30%] h-full flex flex-row justify-center items-center'>
        <Icon className={`text-4xl ${classNameIcon}`} />
      </div>
      <div className='w-[70%] h-full flex flex-col'>
        <div className='h-[55%] w-full flex flex-row justify-center items-end'>
          <p className='text-4xl'> {title} </p>
        </div>
        <div className='h-[45%] w-full flex flex-row justify-center items-start'>
          <p> {subTitle} </p>
        </div>
      </div>
    </div>
  )
}
