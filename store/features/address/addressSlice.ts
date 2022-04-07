import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { NextRouter } from 'next/router'
import {
  addAddressGql,
  deleteAddressGql,
  editAddressGql,
  getAddressByUserGql
} from '../../../gql'
import { axiosGraphqlUtils } from '../../../utils'

export type TCountry = {
  id: string
  label: string
  value: string
}

export type TCheckInputs = {
  id?: string
  address: string
  address0?: string
  postalCode: string
  city: string
  phono: string
  country: TCountry
}

export interface IAddress {
  address: TCheckInputs[]
  selectedAddress?: TCheckInputs
  isError: boolean
  message?: string
}

const initialState: IAddress = {
  address: [],
  selectedAddress: undefined,
  isError: false,
  message: undefined
}

const directionSlice = createSlice({
  name: 'direction',
  initialState,
  reducers: {
    loadAddressAction: (state, action: PayloadAction<TCheckInputs[]>) => {
      state.address = action.payload
    },
    addAddressAction: (state, action: PayloadAction<TCheckInputs>) => {
      state.address.push(action.payload)
    },
    selectedAddressAction: (
      state,
      action: PayloadAction<TCheckInputs | undefined>
    ) => {
      state.selectedAddress = action.payload
    },
    isErrorAction: (state, action: PayloadAction<boolean>) => {
      state.isError = action.payload
    },
    messageAction: (state, action: PayloadAction<string | undefined>) => {
      state.message = action.payload
    },
    editAddressAction: (state, action: PayloadAction<TCheckInputs>) => {
      state.address = state.address.map(address => {
        if (address.id === action.payload.id) {
          return action.payload
        }
        return address
      })
    },
    deleteAddressAction: (state, action: PayloadAction<string>) => {
      state.address = state.address.filter(
        address => address.id !== action.payload
      )
    }
  }
})

export const {
  addAddressAction,
  loadAddressAction,
  selectedAddressAction,
  isErrorAction,
  messageAction,
  editAddressAction,
  deleteAddressAction
} = directionSlice.actions

export const loadAction = (idUser: string = '') => async (
  dispatch: Dispatch
) => {
  if (idUser && idUser !== '') {
    try {
      const data = await axiosGraphqlUtils({
        query: getAddressByUserGql,
        variables: { idUser }
      })
      if (data.errors) {
        dispatch(loadAddressAction(initialState.address))
      } else {
        dispatch(loadAddressAction(data.data.getAddressesByUser))
      }
    } catch (error) {
      dispatch(loadAddressAction(initialState.address))
    }
  }
}

export const addAddress = (
  address: TCheckInputs,
  userId: string,
  router: NextRouter
) => async (dispatch: Dispatch) => {
  try {
    const data = await axiosGraphqlUtils({
      query: addAddressGql,
      variables: {
        input: { ...address, country: address.country.value, user: userId }
      }
    })

    if (data.errors) {
      dispatch(isErrorAction(true))
      dispatch(messageAction(data.errors[0].message))
    } else {
      dispatch(isErrorAction(false))
      dispatch(messageAction(undefined))
      dispatch(addAddressAction(data.data.addAddress))
      dispatch(selectedAddressAction(data.data.addAddress.address))
      router.push('/checkout/summary')
    }
  } catch (error) {
    dispatch(isErrorAction(true))
    dispatch(messageAction('Error al agregar la dirección'))
  }
}

export const editAddress = (
  address: TCheckInputs,
  editAddressId: string,
  userId: string,
  router: NextRouter
) => async (dispatch: Dispatch) => {
  try {
    const data = await axiosGraphqlUtils({
      query: editAddressGql,
      variables: {
        editAddressId,
        input: {
          ...address,
          country: address.country.value,
          user: userId
        }
      }
    })

    if (data.errors) {
      dispatch(isErrorAction(true))
      dispatch(messageAction(data.errors[0].message))
    } else {
      dispatch(isErrorAction(false))
      dispatch(messageAction(undefined))
      dispatch(addAddressAction(data.data.editAddress))
      dispatch(selectedAddressAction(data.data.editAddress.address))
      router.push('/checkout/summary')
    }
  } catch (error) {
    dispatch(isErrorAction(true))
    dispatch(messageAction('Error al agregar la dirección'))
  }
}

export const deleteAddress = (id: string) => async (dispatch: Dispatch) => {
  try {
    const data = await axiosGraphqlUtils({
      query: deleteAddressGql,
      variables: {
        deleteAddressId: id
      }
    })

    if (data.errors) {
      dispatch(isErrorAction(true))
      dispatch(messageAction(data.errors[0].message))
    } else {
      dispatch(isErrorAction(false))
      dispatch(messageAction(undefined))
      dispatch(deleteAddressAction(id))
    }
  } catch (error) {
    dispatch(isErrorAction(true))
    dispatch(messageAction('Error al eliminar la dirección'))
  }
}

export default directionSlice.reducer
