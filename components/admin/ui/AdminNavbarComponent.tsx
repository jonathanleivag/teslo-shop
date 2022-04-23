import Link from 'next/link'
import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { changeMenu } from '../../../store/features'

export const AdminNavbarComponent: FC = () => {
  const dispatch = useDispatch()
  const open = useSelector((state: RootState) => state.menu.open)

  return (
    <nav
      className={`fixed transform ease-in-out duration-1000 ${
        open ? 'z-40' : 'z-[60]'
      }  top-0 bg-white w-full py-3 flex flex-row justify-center items-center`}
    >
      <div className='w-[96%] flex flex-row justify-between'>
        <div className='w-1/2 lg:w-[90%] flex flex-row gap-1'>
          <Link href='/admin' replace passHref shallow={false}>
            <a>
              <span className='prose prose-base font-bold'>Dashboard </span>
              <span className='prose prose-sm font-sans'> / </span>
            </a>
          </Link>
          <Link href='/' replace passHref shallow={false}>
            <a>
              <span className='prose prose-base font-bold'>Teslo |</span>
              <span className='prose prose-sm font-sans'> Shop</span>
            </a>
          </Link>
        </div>

        <div className='w-1/2 lg:w-[10%] flex flex-row gap-3 justify-end lg:justify-center items-center'>
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
