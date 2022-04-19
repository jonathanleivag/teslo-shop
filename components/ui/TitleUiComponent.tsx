import { FC } from 'react'

export interface ITitleUiComponent {
  claseName?: string
}

export const TitleUiComponent: FC<ITitleUiComponent> = ({
  children,
  claseName
}) => {
  return (
    <h1 className={`prose-2xl font-bold pb-10 uppercase ${claseName}`}>
      {children}
    </h1>
  )
}
