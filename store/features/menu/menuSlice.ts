import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IMenuState {
  open: boolean
}

const initialState: IMenuState = {
  open: false
}

export const menuSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    changeMenu: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { changeMenu } = menuSlice.actions

export default menuSlice.reducer
