import { Dispatch, FC, SetStateAction, useEffect } from 'react'
import { ICartData } from '../../store/features'

export type TArithmetic = 'sum' | 'subtract'

export type TCountUiComponent = {
  count: number
  setCount: (count: number) => void
  inStock: number
  setTempCartProduct: Dispatch<SetStateAction<ICartData>>
}

export const CountUiComponent: FC<TCountUiComponent> = ({
  count,
  setCount,
  setTempCartProduct,
  inStock
}) => {
  useEffect(() => {
    setTempCartProduct(prevState => ({ ...prevState, quantity: count }))
    return () => {}
  }, [count, setTempCartProduct])

  const handleCount = (operation: TArithmetic) => {
    switch (operation) {
      case 'sum':
        if (count < inStock) {
          setCount(count + 1)
        }
        break
      case 'subtract':
        if (count > 1) {
          setCount(count - 1)
        }
        break
      default:
        break
    }
  }

  return (
    <div className='w-24 h-8 border grid grid-cols-3'>
      <button
        className='w-full h-full border font-bold flex flex-row justify-center items-center'
        onClick={() => handleCount('subtract')}
      >
        -
      </button>
      <p className='w-full h-full flex flex-row justify-center items-center'>
        {count}
      </p>
      <button
        className='w-full h-full border font-bold flex flex-row justify-center items-center'
        onClick={() => handleCount('sum')}
      >
        +
      </button>
    </div>
  )
}
