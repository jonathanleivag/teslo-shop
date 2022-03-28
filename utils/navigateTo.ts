import { Dispatch } from '@reduxjs/toolkit'
import { NextRouter } from 'next/router'
import { changeMenu } from '../store/features'

export const navigateTo = (
  router: NextRouter,
  dispatch: Dispatch,
  url: string
) => {
  dispatch(changeMenu(false))
  router.push(url)
}
