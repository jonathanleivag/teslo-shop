import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

export type TCheckInputs = {
  name: string
  lastname: string
  address: string
  address0: string
  postalCode: string
  city: string
  phono: string
  country: string
}

const initialState: TCheckInputs = {
  name: '',
  lastname: '',
  address: '',
  address0: '',
  postalCode: '',
  city: '',
  phono: '',
  country: ''
}

const directionSlice = createSlice({
  name: 'direction',
  initialState,
  reducers: {
    addDirectionAction: (state, action: PayloadAction<TCheckInputs>) => {
      state.name = action.payload.name
      state.lastname = action.payload.lastname
      state.address = action.payload.address
      state.address0 = action.payload.address0
      state.postalCode = action.payload.postalCode
      state.city = action.payload.city
      state.phono = action.payload.phono
      state.country = action.payload.country
    }
  }
})

export const { addDirectionAction } = directionSlice.actions

export const addDirection = () => (dispatch: Dispatch) => {
  if (Cookies.get('name')) {
    dispatch(
      addDirectionAction({
        name: Cookies.get('name')!,
        lastname: Cookies.get('lastname')!,
        address: Cookies.get('address')!,
        address0: Cookies.get('address0') || '',
        postalCode: Cookies.get('postalCode')!,
        city: Cookies.get('city')!,
        phono: Cookies.get('phono')!,
        country: Cookies.get('country')!
      })
    )
  }
}

export default directionSlice.reducer
