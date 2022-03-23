import { FC } from 'react'
import { HeaderLoginMetaComponent } from '../components'

export interface ILoginLayoutProps {
  title: string
}

export const LoginLayout: FC<ILoginLayoutProps> = ({ title, children }) => {
  return (
    <>
      <HeaderLoginMetaComponent title={title} />
      <main> {children} </main>
    </>
  )
}
