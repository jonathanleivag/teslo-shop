import Image from 'next/image'
import { FC } from 'react'
import { useBlurDataURL } from '../../hooks'

export interface IImageUiProps {
  image: string
  description: string
}

export const ImageUiComponent: FC<IImageUiProps> = ({ image, description }) => {
  const blurDataUrl = useBlurDataURL(100, 400 * 0.9)

  return (
    <Image
      layout='fill'
      src={image}
      alt={description}
      className='transform duration-300 ease-in-out object-contain md:object-cover'
      loading='lazy'
      placeholder='blur'
      blurDataURL={blurDataUrl}
    />
  )
}
