import { useRouter } from 'next/router'
import { FC } from 'react'
import { IoIosArrowBack } from 'react-icons/io'

export const AdminBackUiComponent: FC = () => {
  const { asPath, back } = useRouter()

  return (
    <>
      {asPath !== '/admin' && (
        <button type='button' onClick={() => back()}>
          <IoIosArrowBack className='text-lg' />
        </button>
      )}
    </>
  )
}
