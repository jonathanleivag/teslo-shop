import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { ProducByIdGql, ProductsGql } from '../../../gql'
import { IProduct, TGender } from '../../../interfaces'
import { axiosGraphqlUtils } from '../../../utils'

export type TUseProducts = TGender | null

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
    const data = await axiosGraphqlUtils({
      query: ProductsGql,
      variables: { gender }
    })
    if (!data.errors) {
      dispatch(changeLoading(false))
      dispatch(addProductAction(data.data.products))
    } else {
      dispatch(changeLoading(false))
      dispatch(changeError('Error al cargar los productos'))
    }
  } catch (error) {
    dispatch(changeLoading(false))
    dispatch(changeError(error))
  }
}

export const setInStock = (id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(changeLoading(true))
    const data = await axiosGraphqlUtils({
      query: ProducByIdGql,
      variables: { producByIdId: id }
    })
    dispatch(changeInStock(data.data.producById.inStock))
    dispatch(changeLoading(false))
  } catch (error) {
    dispatch(changeLoading(false))
    dispatch(changeError(error))
  }
}

export default productSlice.reducer
