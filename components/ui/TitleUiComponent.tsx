import { FC } from 'react'

export const TitleUiComponent: FC = ({ children }) => {
  return <h1 className='prose-2xl font-bold pb-10 uppercase'> {children} </h1>
}
