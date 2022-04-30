import { useRouter } from 'next/router'
import { FC } from 'react'
import { IoIosArrowBack } from 'react-icons/io'

export const BackUiComponent: FC = () => {
  const { asPath, back } = useRouter()

  return (
    <>
      {asPath !== '/' && (
        <button type='button' onClick={() => back()}>
          <IoIosArrowBack className='text-lg' />
        </button>
      )}
    </>
  )
}
