import Head from 'next/head'
import { FC } from 'react'
import { IShopLayoutProps } from '../../layouts'

const HeaderMetaComponent: FC<IShopLayoutProps> = ({
  title,
  pageDescription,
  imageFullUrl
}) => {
  return (
    <Head>
      <title> {title} </title>
      <meta name='description' content={pageDescription} />
      <meta property='og:title' content={title} />
      <meta name='apple-mobile-web-app-capable' content='yes' />
      <meta name='apple-mobile-web-app-status-bar-style' content='default' />
      <meta name='apple-mobile-web-app-title' content='Teslo-shop' />
      <meta name='mobile-web-app-capable' content='yes' />
      <meta name='msapplication-config' content='/icons/browserconfig.xml' />
      <meta name='msapplication-TileColor' content='#2B5797' />
      <meta name='msapplication-tap-highlight' content='no' />
      <meta name='theme-color' content='#000000' />
      <meta property='og:description' content={pageDescription} />
      {imageFullUrl && <meta property='og:image' content={imageFullUrl} />}
      <meta property='og:type' content='website' />
      <meta property='og:url' content='https://teslo-shop.jonathanleivag.cl/' />
      <meta property='og:site_name' content='Teslo-Shop' />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={pageDescription} />
      {imageFullUrl && <meta name='twitter:image' content={imageFullUrl} />}
      <meta name='twitter:site' content='@teslo_shop' />
      <meta name='twitter:creator' content='@teslo_shop' />
      <meta
        name='twitter:domain'
        content='https://teslo-shop.jonathanleivag.cl/'
      />
      <meta name='twitter:image:alt' content='Teslo-Shop' />
      <meta name='twitter:image:width' content='1200' />
      <meta name='twitter:image:height' content='630' />
    </Head>
  )
}

export default HeaderMetaComponent
