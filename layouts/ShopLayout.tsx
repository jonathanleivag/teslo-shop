import { FC } from 'react'
import {
  HeaderMetaComponent,
  NavbarUiComponent,
  SidebarUiComponent
} from '../components'

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
      <SidebarUiComponent />
      <main>{children}</main>
    </>
  )
}
