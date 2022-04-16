import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../..'
import { loadOrderInCartGql } from '../../../gql'
import { ILogin, TGender, TValidSize, IOrder } from '../../../interfaces'
import {
  addOrderInCartUtil,
  axiosGraphqlUtils,
  NEXT_PUBLIC_TAX
} from '../../../utils'

export interface ICartData {
  id: string
  image: string
  price: number
  size?: TValidSize
  slug: string
  title: string
  gender: TGender
  quantity: number
}

export interface IOrdenSummary {
  numberOfItem: number
  subtotal: number
  tax: number
  total: number
}

export interface ICartState {
  cart: ICartData[]
  ordenSummary: IOrdenSummary
  loading: boolean | undefined
}

const initialState: ICartState = {
  cart: [],
  ordenSummary: {
    numberOfItem: 0,
    subtotal: 0,
    tax: 0,
    total: 0
  },
  loading: undefined
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCartAction: (state, action: PayloadAction<ICartData>) => {
      const productInCart = state.cart.some(p => p.id === action.payload.id)
      if (!productInCart) {
        state.cart.push(action.payload)
      }
      const productInCartButDifferentSize = state.cart.some(
        p => p.id === action.payload.id && p.size === action.payload.size
      )
      if (!productInCartButDifferentSize) {
        state.cart.push(action.payload)
      }

      const updateProduct = state.cart.map(p => {
        if (p.id !== action.payload.id) {
          return p
        }
        if (p.size !== action.payload.size) {
          return p
        }
        p = { ...p, quantity: action.payload.quantity }
        return p
      })
      state.cart = [...updateProduct]
    },
    addCookies (state, action: PayloadAction<ICartData[]>) {
      state.cart = action.payload
    },
    updateQuantityAction (state, action: PayloadAction<ICartData>) {
      state.cart = state.cart.map(p => {
        if (p.id !== action.payload.id) {
          return p
        }
        if (p.size !== action.payload.size) {
          return p
        }
        return action.payload
      })
    },
    removeProductAction (state, action: PayloadAction<ICartData>) {
      state.cart = state.cart.filter(
        p => !(p.id === action.payload.id && p.size === action.payload.size)
      )
    },
    changeOrdenSummary (state) {
      const numberOfItem = state.cart.reduce((acc, p) => acc + p.quantity, 0)
      const subtotal = state.cart.reduce(
        (acc, p) => acc + p.price * p.quantity,
        0
      )
      const tax = state.cart.reduce(
        (acc, p) => acc + p.price * p.quantity * (NEXT_PUBLIC_TAX / 100),
        0
      )

      state.ordenSummary = {
        numberOfItem,
        subtotal,
        tax,
        total: subtotal + tax
      }
    },
    loadOrderInCartAction (state, action: PayloadAction<IOrder>) {
      state.cart = action.payload.orderItems
      state.ordenSummary = action.payload
    },
    changeLoading (state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const {
  addToCartAction,
  addCookies,
  updateQuantityAction,
  removeProductAction,
  changeOrdenSummary,
  loadOrderInCartAction,
  changeLoading
} = cartSlice.actions

export const addToCart = (produt: ICartData, session: ILogin | null) => (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  dispatch(addToCartAction(produt))
  dispatch(changeOrdenSummary())
  addOrderInCartUtil(
    session,
    getState().cart.ordenSummary,
    getState().cart.cart
  )
}

export const updateQuantity = (produt: ICartData, session: ILogin | null) => (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  dispatch(updateQuantityAction(produt))
  dispatch(changeOrdenSummary())
  addOrderInCartUtil(
    session,
    getState().cart.ordenSummary,
    getState().cart.cart
  )
}
export const removeProduct = (produt: ICartData, session: ILogin | null) => (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  dispatch(removeProductAction(produt))
  dispatch(changeOrdenSummary())
  addOrderInCartUtil(
    session,
    getState().cart.ordenSummary,
    getState().cart.cart
  )
}

export const loadOrderInCart = (idUser: string) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch(changeLoading(true))
    const { data } = await axiosGraphqlUtils({
      query: loadOrderInCartGql,
      variables: { idUser }
    })
    const loadOrderInCart = data.loadOrderInCart as IOrder
    dispatch(loadOrderInCartAction(loadOrderInCart))
    dispatch(changeLoading(false))
  } catch (error) {
    console.error(error)
    dispatch(changeLoading(false))
  }
}

export default cartSlice.reducer
