import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { AiOutlineSearch, AiOutlineShoppingCart } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { changeMenu } from '../../store/features'

export const NavbarUiComponent: FC = () => {
  const dispatch = useDispatch()
  const { asPath } = useRouter()

  return (
    <nav className='fixed z-40 top-0 bg-white w-full py-3 flex flex-row justify-center items-center'>
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
            <li
              className={`menu-li ${asPath === '/category/woman' &&
                'bg-gray-300'}`}
            >
              <Link href='/category/woman'>
                <a className='menu-a'>Mujeres</a>
              </Link>
            </li>
            <li
              className={`menu-li ${asPath === '/category/men' &&
                'bg-gray-300'}`}
            >
              <Link href='/category/men'>
                <a className='menu-a'>Hombres</a>
              </Link>
            </li>
            <li
              className={`menu-li ${asPath === '/category/kid' &&
                'bg-gray-300'}`}
            >
              <Link href='/category/kid'>
                <a className='menu-a'>Niños</a>
              </Link>
            </li>
          </ul>
        </div>

        <div className='w-1/2 lg:w-[10%] flex flex-row gap-3 justify-end lg:justify-center items-center'>
          <button onClick={() => dispatch(changeMenu(true))}>
            <AiOutlineSearch className='text-xl' />
          </button>

          <div className='relative'>
            <div className='absolute flex flex-row justify-center items-center text-white text-[10px] h-4 w-4 -top-2 -right-2 rounded-full bg-blue-600'>
              2
            </div>
            <Link href='/cart' passHref>
              <a>
                <AiOutlineShoppingCart className='text-xl' />
              </a>
            </Link>
          </div>
          <button
            onClick={() => dispatch(changeMenu(true))}
            className='menu-a font-medium'
          >
            Menú
          </button>
        </div>
      </div>
    </nav>
  )
}
