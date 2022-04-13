import Cookies from 'js-cookie'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { AiOutlineMan, AiOutlineWoman } from 'react-icons/ai'
import { BsDoorClosed, BsKey } from 'react-icons/bs'
import { FaChild } from 'react-icons/fa'
import { FiUsers } from 'react-icons/fi'
import { HiOutlineUserCircle } from 'react-icons/hi'
import { MdOutlineCategory, MdProductionQuantityLimits } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { SearchUiComponent } from '../..'
import { RootState } from '../../../store'
import { changeMenu, logoutAction } from '../../../store/features'

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
        Cookies.remove('token')
        Cookies.remove('user')
        Cookies.remove('cart')

        Cookies.remove('name')
        Cookies.remove('lastname')
        Cookies.remove('address')
        Cookies.remove('address0')
        Cookies.remove('postalCode')
        Cookies.remove('city')
        Cookies.remove('phono')
        Cookies.remove('country')

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
            <li className='li_sidebar'>
              <MdProductionQuantityLimits className='text-2xl' />
              <p className='prose-lg'>Mis ordenes</p>
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
        <li className='li_sidebar'>
          <Link href='/category/woman' passHref>
            <a className='flex flex-row gap-4'>
              <AiOutlineWoman className='text-2xl' />
              <p className='prose-lg'>Mujeres</p>
            </a>
          </Link>
        </li>
        <li className='li_sidebar'>
          <Link href='/category/men' passHref>
            <a className='flex flex-row gap-4'>
              <AiOutlineMan className='text-2xl' />
              <p className='prose-lg'>Hombres</p>
            </a>
          </Link>
        </li>
        <li className='li_sidebar'>
          <Link href='/category/kid' passHref>
            <a className='flex flex-row gap-4'>
              <FaChild className='text-2xl' />
              <p className='prose-lg'>Niños</p>
            </a>
          </Link>
        </li>
      </ul>
      {/* admin  */}
      {user.user && user.token && user.user.role === 'admin' && (
        <>
          <ul className='w-[85%] py-5 h-auto flex flex-col'>
            <li className='li_sidebar'>
              <p className='prose-lg'>Admin Panel</p>
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
