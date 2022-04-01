import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TGender, TValidSize } from '../../../interfaces'
import { NEXT_PUBLIC_TAX } from '../../../utils'

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
}

const initialState: ICartState = {
  cart: [],
  ordenSummary: {
    numberOfItem: 0,
    subtotal: 0,
    tax: 0,
    total: 0
  }
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ICartData>) => {
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
    updateQuantity (state, action: PayloadAction<ICartData>) {
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
    removeProduct (state, action: PayloadAction<ICartData>) {
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
    }
  }
})

// Action creators are generated for each case reducer function
export const {
  addToCart,
  addCookies,
  updateQuantity,
  removeProduct,
  changeOrdenSummary
} = cartSlice.actions

export default cartSlice.reducer
