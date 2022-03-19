import Link from 'next/link'
import { FC } from 'react'
import { AiOutlineMan, AiOutlineWoman } from 'react-icons/ai'
import { BiSearchAlt2 } from 'react-icons/bi'
import { BsDoorClosed, BsKey } from 'react-icons/bs'
import { FaChild } from 'react-icons/fa'
import { FiUsers } from 'react-icons/fi'
import { HiOutlineUserCircle } from 'react-icons/hi'
import { MdOutlineCategory, MdProductionQuantityLimits } from 'react-icons/md'

export const MenuUiComponent: FC = () => {
  return (
    <div className='w-full h-full py-10 flex flex-col items-center font-light overflow-y-auto'>
      <ul className='w-[85%] h-full flex flex-col'>
        {/* search */}
        <li>
          <div className='li_sidebar border-b mb-5'>
            <input
              type='text'
              className='w-full focus:outline-none font-light'
              placeholder='Buscar...'
            />
            <BiSearchAlt2 className='text-2xl pointer-events-none' />
          </div>
        </li>

        {/* menu profile */}
        <li className='li_sidebar'>
          <HiOutlineUserCircle className='text-2xl' />
          <p className='prose-lg'>Perfil</p>
        </li>
        <li className='li_sidebar'>
          <MdProductionQuantityLimits className='text-2xl' />
          <p className='prose-lg'>Mis ordenes</p>
        </li>
        <li className='li_sidebar'>
          <BsKey className='text-2xl' />
          <p className='prose-lg'>Ingresa</p>
        </li>
        <li className='li_sidebar'>
          <BsDoorClosed className='text-2xl' />
          <p className='prose-lg'>Salir</p>
        </li>
      </ul>

      {/* menu lg  */}
      <ul className='lg:hidden w-[85%] py-10 h-full flex flex-col'>
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
      <ul className='w-[85%] py-10 h-full flex flex-col'>
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
    </div>
  )
}
