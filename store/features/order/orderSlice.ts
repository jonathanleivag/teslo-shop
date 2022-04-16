import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IOrderOne } from '../../../interfaces'

export interface IInitialStateOrder {
  selectedOrder?: IOrderOne
}

const initialState: IInitialStateOrder = {
  selectedOrder: undefined
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    changeSelectedOrder: (state, action: PayloadAction<IOrderOne>) => {
      state.selectedOrder = action.payload
    }
  }
})

export const { changeSelectedOrder } = orderSlice.actions

export default orderSlice.reducer
