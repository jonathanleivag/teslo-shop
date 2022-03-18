import Link from 'next/link'
import { FC } from 'react'
import { AiOutlineSearch, AiOutlineShoppingCart } from 'react-icons/ai'

export const NavbarUiComponent: FC = () => {
  return (
    <nav className='fixed z-50 top-0 bg-white w-full py-3 flex flex-row justify-center items-center'>
      <div className='w-[96%] flex flex-row'>
        <div className='w-1/2 lg:w-[10%]'>
          <Link href='/'>
            <a>
              <span className='prose prose-base font-bold'>Teslo |</span>
              <span className='prose prose-sm font-sans'> Shop</span>
            </a>
          </Link>
        </div>
        <div className='hidden lg:block w-[80%]'>
          <ul className='flex flex-row justify-center items-center gap-1'>
            <li className='menu-li'>
              <Link href='/category/woman'>
                <a className='menu-a'>Mujeres</a>
              </Link>
            </li>
            <li className='menu-li'>
              <Link href='/category/men'>
                <a className='menu-a'>Hombres</a>
              </Link>
            </li>
            <li className='menu-li'>
              <Link href='/category/kid'>
                <a className='menu-a'>Niños</a>
              </Link>
            </li>
          </ul>
        </div>

        <div className='w-1/2 lg:w-[10%] flex flex-row gap-3 justify-end lg:justify-center items-center'>
          <a href=''>
            <AiOutlineSearch className='text-xl' />
          </a>
          <div className='relative'>
            <div className='absolute flex flex-row justify-center items-center text-white text-[10px] h-4 w-4 -top-2 -right-2 rounded-full bg-blue-600'>
              2
            </div>
            <a href=''>
              <AiOutlineShoppingCart className='text-xl' />
            </a>
          </div>
          <button className='menu-a font-medium'>Menú</button>
        </div>
      </div>
    </nav>
  )
}
