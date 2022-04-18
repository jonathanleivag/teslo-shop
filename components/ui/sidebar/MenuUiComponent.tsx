import { signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { AiOutlineMan, AiOutlineWoman } from 'react-icons/ai'
import { BsDoorClosed, BsKey } from 'react-icons/bs'
import { FaChild } from 'react-icons/fa'
import { FiUsers } from 'react-icons/fi'
import { HiOutlineUserCircle } from 'react-icons/hi'
import {
  MdOutlineCategory,
  MdOutlineDashboard,
  MdProductionQuantityLimits
} from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { SearchUiComponent } from '../..'
import { RootState } from '../../../store'
import { changeMenu, logoutAction } from '../../../store/features'
import { navigateTo } from '../../../utils'

export const MenuUiComponent: FC = () => {
  const user = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()
  const router = useRouter()

  const handleLogout = () => {
    Swal.fire({
      title: '¿Quieres cerrar session?',
      confirmButtonColor: '#2563EB',
      showCancelButton: true,
      confirmButtonText: 'Cerrar'
    }).then(result => {
      if (result.isConfirmed) {
        dispatch(logoutAction())
        dispatch(changeMenu(false))
        signOut()
      }
    })
  }

  const handleLogin = () => {
    router.push(`/auth/login?redirect=${router.asPath}`)
    dispatch(changeMenu(false))
  }

  return (
    <div className='w-full h-full py-10 flex flex-col items-center font-light overflow-y-auto'>
      <ul className='w-[85%] h-auto flex flex-col'>
        {/* search */}
        <li>
          <SearchUiComponent />
        </li>

        {/* menu profile */}
        {user.token && user.user && (
          <>
            <li className='li_sidebar'>
              <HiOutlineUserCircle className='text-2xl' />
              <p className='prose-lg'>Perfil</p>
            </li>
            <li>
              <button
                className='li_sidebar'
                onClick={() => navigateTo(router, dispatch, '/orders/history')}
              >
                <MdProductionQuantityLimits className='text-2xl' />
                <p className='prose-lg'>Mis ordenes</p>
              </button>
            </li>
            <li>
              <button className='li_sidebar' onClick={handleLogout}>
                <BsDoorClosed className='text-2xl' />
                <p className='prose-lg'>Salir</p>
              </button>
            </li>
          </>
        )}
        {!user.token && !user.user && (
          <li>
            <button className='li_sidebar' onClick={handleLogin}>
              <BsKey className='text-2xl' />
              <p className='prose-lg'>Ingresa</p>
            </button>
          </li>
        )}
      </ul>

      {/* menu lg  */}
      <ul className='lg:hidden w-[85%] h-auto py-5 flex flex-col'>
        <li className='li_sidebar'>
          <p className='prose-lg'>Categoría</p>
        </li>
        <li>
          <button
            className='li_sidebar'
            onClick={() => navigateTo(router, dispatch, '/category/woman')}
          >
            <AiOutlineWoman className='text-2xl' />
            <p className='prose-lg'>Mujeres</p>
          </button>
        </li>
        <li>
          <button
            className='li_sidebar'
            onClick={() => navigateTo(router, dispatch, '/category/men')}
          >
            <AiOutlineMan className='text-2xl' />
            <p className='prose-lg'>Hombres</p>
          </button>
        </li>
        <li>
          <button
            className='li_sidebar'
            onClick={() => navigateTo(router, dispatch, '/category/kid')}
          >
            <FaChild className='text-2xl' />
            <p className='prose-lg'>Niños</p>
          </button>
        </li>
      </ul>
      {/* admin  */}
      {user.user && user.token && user.user.role === 'admin' && (
        <>
          <ul className='w-[85%] py-5 h-auto flex flex-col'>
            <li className='li_sidebar'>
              <p className='prose-lg'>Admin Panel</p>
            </li>
            <li>
              <button
                onClick={() => navigateTo(router, dispatch, '/admin')}
                className='li_sidebar'
              >
                <MdOutlineDashboard className='text-2xl' />
                <p className='prose-lg'>Dashboard</p>
              </button>
            </li>
            <li className='li_sidebar'>
              <MdOutlineCategory className='text-2xl' />
              <p className='prose-lg'>Productos</p>
            </li>
            <li className='li_sidebar'>
              <MdProductionQuantityLimits className='text-2xl' />
              <p className='prose-lg'>Ordenes</p>
            </li>
            <li className='li_sidebar'>
              <FiUsers className='text-2xl' />
              <p className='prose-lg'>Usuarios</p>
            </li>
          </ul>
        </>
      )}
    </div>
  )
}
