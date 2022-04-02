import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { ProducByIdGql, ProductsGql, TUseProducts } from '../../../gql'
import { IProduct } from '../../../interfaces'
import { NEXT_PUBLIC_URL_API } from '../../../utils'

export interface IInitialState {
  products: IProduct[]
  error: unknown
  loading: boolean
  inStock: number
}

const initialState: IInitialState = {
  products: [],
  error: null,
  loading: false,
  inStock: 0
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addProductAction: (state, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload
    },
    changeError: (state, action: PayloadAction<unknown>) => {
      state.error = action.payload
    },
    changeLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    changeInStock: (state, action: PayloadAction<number>) => {
      state.inStock = action.payload
    }
  }
})

export const {
  addProductAction,
  changeError,
  changeLoading,
  changeInStock
} = productSlice.actions

export const addProduct = (gender: TUseProducts) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch(changeLoading(true))
    const { data } = await axios({
      url: NEXT_PUBLIC_URL_API,
      method: 'POST',
      data: { query: ProductsGql(gender) }
    })
    dispatch(changeLoading(false))
    dispatch(addProductAction(data.data.products))
  } catch (error) {
    dispatch(changeLoading(false))
    dispatch(changeError(error))
  }
}

export const setInStock = (id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(changeLoading(true))
    const { data } = await axios({
      url: NEXT_PUBLIC_URL_API,
      method: 'POST',
      data: { query: ProducByIdGql(id) }
    })
    dispatch(changeInStock(data.data.producById.inStock))
    dispatch(changeLoading(false))
  } catch (error) {
    dispatch(changeLoading(false))
    dispatch(changeError(error))
  }
}

export default productSlice.reducer
