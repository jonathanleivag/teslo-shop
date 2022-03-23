import Head from 'next/head'
import { FC } from 'react'
import { ILoginLayoutProps } from '../../layouts/LoginLayout'

const HeaderLoginMetaComponent: FC<ILoginLayoutProps> = ({ title }) => {
  return (
    <Head>
      <title> {title} </title>
      <meta property='og:title' content={title} />
      <meta property='og:type' content='website' />
      <meta property='og:site_name' content='Teslo-Shop' />
    </Head>
  )
}

export default HeaderLoginMetaComponent
