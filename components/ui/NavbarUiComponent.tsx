import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { AiOutlineSearch, AiOutlineShoppingCart } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { changeMenu } from '../../store/features'
import { RootState } from '../../store/index'
import { BackUiComponent } from './BackUiComponent'

export const NavbarUiComponent: FC = () => {
  const dispatch = useDispatch()
  const { asPath, push } = useRouter()
  const open = useSelector((state: RootState) => state.menu.open)
  const totalCart = useSelector(
    (state: RootState) => state.cart.ordenSummary.numberOfItem
  )

  return (
    <nav
      className={`fixed transform ease-in-out duration-1000 ${
        open ? 'z-40' : 'z-[60]'
      }  top-0 bg-white w-full py-3 flex flex-row justify-center items-center`}
    >
      <div className='w-[96%] flex flex-row'>
        <div className='w-1/2 lg:w-[13%] flex flex-row justify-start items-center gap-1'>
          <BackUiComponent />
          <Link href='/' replace passHref shallow={false}>
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
              <Link href='/category/woman' passHref replace shallow={false}>
                <a className='menu-a'>Mujeres</a>
              </Link>
            </li>
            <li
              className={`menu-li ${asPath === '/category/men' &&
                'bg-gray-300'}`}
            >
              <Link href='/category/men' passHref replace shallow={false}>
                <a className='menu-a'>Hombres</a>
              </Link>
            </li>
            <li
              className={`menu-li ${asPath === '/category/kid' &&
                'bg-gray-300'}`}
            >
              <Link href='/category/kid' passHref replace shallow={false}>
                <a className='menu-a'>Niños</a>
              </Link>
            </li>
          </ul>
        </div>

        <div className='w-1/2 lg:w-[7%] flex flex-row gap-3 justify-end lg:justify-center items-center cursor-pointer'>
          <div onClick={() => dispatch(changeMenu(true))}>
            <AiOutlineSearch className='text-xl' />
          </div>

          <div
            onClick={() => push('/cart')}
            className='relative cursor-pointer'
          >
            {totalCart > 0 && (
              <div className='absolute flex flex-row justify-center items-center text-white text-[10px] h-4 w-4 -top-2 -right-2 rounded-full bg-blue-600'>
                {totalCart > 9 ? '9+' : totalCart}
              </div>
            )}
            <AiOutlineShoppingCart className='text-xl' />
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
