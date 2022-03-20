import { FC } from 'react'
import { TValidSize } from '../../../interfaces'

export interface SizeSelectorProductSlugProps {
  selectedSize?: TValidSize
  sizes: TValidSize[]
}

export const SizeSelectorProductSlugComponent: FC<SizeSelectorProductSlugProps> = ({
  selectedSize,
  sizes
}) => {
  return (
    <div className='w-full'>
      {sizes.map(size => (
        <button
          className={`mx-2 border-b ${
            size === selectedSize ? 'border-gray-600' : 'border-transparent'
          }  hover:border-gray-600`}
          key={size}
        >
          {size}
        </button>
      ))}
    </div>
  )
}
