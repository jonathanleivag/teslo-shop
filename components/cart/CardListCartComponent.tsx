import { FC } from 'react'
import { initialData } from '../../database/products'
import { CountUiComponent, ImageUiComponent } from '../ui'

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
  initialData.products[3],
  initialData.products[4],
  initialData.products[5],
  initialData.products[6],
  initialData.products[7],
  initialData.products[8],
  initialData.products[9],
  initialData.products[10],
  initialData.products[11],
  initialData.products[12]
]

export interface ICardListCartComponentProps {
  edit?: boolean
}

export const CardListCartComponent: FC<ICardListCartComponentProps> = ({
  edit = false
}) => {
  return (
    <div className='w-full flex flex-col px-5 py-3 gap-3'>
      {productsInCart.map(product => (
        <div key={product.id} className='w-full flex flex-row min-h-[7rem]'>
          <div className='w-[20%] min-h-[7rem] relative'>
            <ImageUiComponent
              image={product.images[0]}
              description={product.description}
            />
          </div>
          <div className='w-[60%] h-full px-5 flex flex-col'>
            <h2> {product.title} </h2>
            <p className='text-sm'>
              Talla: <span className='font-bold'>{product.sizes[0]}</span>
            </p>
            {edit && (
              <div className='w-full my-2'>
                <CountUiComponent />
              </div>
            )}

            {!edit && <p>3 item</p>}
          </div>
          <div className='w-[20%] h-full flex flex-col items-center justify-start pt-2'>
            <p className='font-bold'>${product.price} </p>
            {edit && (
              <button className='text-blue-600 text-xs'> Remover </button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
