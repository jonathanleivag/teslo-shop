import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { loginGql, registerGql } from '../../../gql'
import { TLoginInputs } from '../../../pages/auth/login'
import { TRegisterInputs } from '../../../pages/auth/register'
import { axiosGraphqlUtils } from '../../../utils'

export interface IUserSlice {
  user?: {
    id: string
    name: string
    email: string
    role: string
    createdAt: string
    updatedAt: string
  }
  message?: string
  token?: string
  isError?: string
  error?: unknown
  loading?: boolean
}

const initialState: IUserSlice = {
  user: undefined,
  message: undefined,
  token: undefined,
  isError: undefined,
  error: undefined,
  loading: false
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginAction: (state, action: PayloadAction<IUserSlice>) => {
      state.user = action.payload.user
      state.message = action.payload.message
      state.token = action.payload.token
      state.isError = undefined
      state.error = undefined
    },
    changeIsError: (state, action: PayloadAction<string | undefined>) => {
      state.user = undefined
      state.message = undefined
      state.token = undefined
      state.isError = action.payload
    },
    changeError: (state, action: PayloadAction<unknown>) => {
      state.user = undefined
      state.message = undefined
      state.token = undefined
      state.error = action.payload
    },
    changeLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    }
  }
})

export const {
  loginAction,
  changeIsError,
  changeError,
  changeLoading
} = userSlice.actions

export const login = (input: TLoginInputs) => async (dispatch: Dispatch) => {
  dispatch(changeLoading(true))
  try {
    const data = await axiosGraphqlUtils({
      query: loginGql,
      variables: { input }
    })
    if (data.errors) {
      dispatch(changeIsError(data.errors[0].message))
      setTimeout(() => {
        dispatch(changeIsError(undefined))
        dispatch(changeLoading(false))
      }, 2000)
    } else {
      dispatch(loginAction(data.data.login))
      dispatch(changeLoading(false))
    }
  } catch (error) {
    dispatch(changeError(error))
    dispatch(changeLoading(false))
  }
}

export const registerUser = (input: TRegisterInputs) => async (
  dispatch: Dispatch
) => {
  try {
    const data = await axiosGraphqlUtils({
      query: registerGql,
      variables: { input: { ...input, role: 'client' } }
    })
    if (data.errors) {
      dispatch(changeIsError(data.errors[0].message))
      setTimeout(() => {
        dispatch(changeIsError(undefined))
        dispatch(changeLoading(false))
      }, 2000)
    } else {
      dispatch(loginAction(data.data.register))
      dispatch(changeLoading(false))
    }
  } catch (error) {
    dispatch(changeError(error))
    dispatch(changeLoading(false))
  }
}

export default userSlice.reducer
