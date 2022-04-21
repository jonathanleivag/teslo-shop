import Head from 'next/head'
import { FC } from 'react'
import { IconType } from 'react-icons'
import { AdminNavbarComponent, SidebarUiComponent } from '../components'
import { TitleUiComponent } from '../components/ui/TitleUiComponent'

export interface IAdminLayoutProps {
  title: string
  subTitle: string
  Icon?: IconType
  titleHead: string
}

export const AdminLayout: FC<IAdminLayoutProps> = ({
  title,
  subTitle,
  Icon,
  children,
  titleHead
}) => {
  return (
    <>
      <Head>
        <title>Admin - {titleHead} </title>
      </Head>
      <AdminNavbarComponent />
      <SidebarUiComponent />
      <main className='mx-auto max-w-[1440px] py-[80px] px-2 md:px-[60px] overflow-hidden'>
        <div className='w-full flex flex-col pb-10'>
          <div className='w-full flex flex-row items-center gap-2'>
            {Icon && <Icon className='prose-2xl' />}
            <TitleUiComponent claseName='pb-0'> {title} </TitleUiComponent>
          </div>
          <p>{subTitle}</p>
        </div>
        {children}
      </main>
    </>
  )
}
