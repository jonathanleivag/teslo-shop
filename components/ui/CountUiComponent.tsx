import { FC, useState } from 'react'

export type TArithmetic = 'sum' | 'subtract'

export const CountUiComponent: FC = () => {
  const [count, setCount] = useState<number>(0)

  const handleCount = (operation: TArithmetic) => {
    switch (operation) {
      case 'sum':
        setCount(count + 1)
        break
      case 'subtract':
        if (count > 0) {
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
