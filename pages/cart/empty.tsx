import { NextPage } from 'next'
import Link from 'next/link'
import { BsCartX } from 'react-icons/bs'
import { ShopLayout } from '../../layouts'

const EmptyPage: NextPage = () => {
  return (
    <ShopLayout
      title={'Carrito vació'}
      pageDescription={'No hay artículos en el carrito de compras'}
    >
      <div className='w-full h-[calc(100vh-200px)] flex flex-col md:flex-row justify-center items-center'>
        <h1 className='text-6xl font-bold'>
          <span className='flex flex-row justify-center items-center gap-2'>
            <BsCartX /> <span className='hidden md:block'> | </span>
          </span>
        </h1>
        <div>
          <p className='ml-4 font-light text-lg'>Carrito vació</p>
          <Link href='/' passHref>
            <a className='ml-4 font-light text-blue-600'>Ir inicio</a>
          </Link>
        </div>
      </div>
    </ShopLayout>
  )
}

export default EmptyPage
