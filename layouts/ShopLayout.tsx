import { FC } from 'react'
import { HeaderMetaComponent, NavbarUiComponent } from '../components'

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
      <NavbarUiComponent />
      {/* TODO: Sidebar */}

      <main>{children}</main>
    </>
  )
}
