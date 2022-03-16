import { FC } from 'react'
import { HeaderMetaComponent } from '../components'

export interface IShopLayoutProps {
  title: string
  pageDescription: string
  imageFullUrl?: string
}

export const ShopLayout: FC<IShopLayoutProps> = ({
  title,
  pageDescription,
  imageFullUrl,
  children
}) => {
  return (
    <>
      <HeaderMetaComponent
        title={title}
        pageDescription={pageDescription}
        imageFullUrl={imageFullUrl}
      />
      {/* TODO: Navbar */}
      {/* TODO: Sidebar */}

      <main>{children}</main>
    </>
  )
}
