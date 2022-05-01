import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { NextRouter } from 'next/router'
import { addAddressGql, deleteAddressGql, editAddressGql } from '../../../gql'
import { axiosGraphqlUtils, Toast } from '../../../utils'

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
  loading: boolean
}

const initialState: IAddress = {
  address: [],
  selectedAddress: undefined,
  isError: false,
  message: undefined,
  loading: false
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
    },
    loadingAction: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
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
  deleteAddressAction,
  loadingAction
} = directionSlice.actions

export const loadAddress = (getAddressesByUser: TCheckInputs[]) => async (
  dispatch: Dispatch
) => {
  dispatch(loadAddressAction(getAddressesByUser))
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
      setTimeout(() => {
        dispatch(messageAction(undefined))
        dispatch(isErrorAction(false))
      }, 3100)
    } else {
      dispatch(isErrorAction(false))
      dispatch(messageAction(undefined))
      dispatch(addAddressAction(data.data.addAddress))
      dispatch(selectedAddressAction(data.data.addAddress.address))
      if (router.pathname.split('/')[1] === 'profile') {
        router.replace('/profile')
      } else {
        router.replace('/checkout/summary')
      }
    }
  } catch (error) {
    dispatch(isErrorAction(true))
    dispatch(messageAction('Error al agregar la dirección'))
    setTimeout(() => {
      dispatch(messageAction(undefined))
      dispatch(isErrorAction(false))
    }, 3100)
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
      setTimeout(() => {
        dispatch(messageAction(undefined))
        dispatch(isErrorAction(false))
      }, 3100)
    } else {
      dispatch(isErrorAction(false))
      dispatch(messageAction(undefined))
      dispatch(addAddressAction(data.data.editAddress))
      dispatch(selectedAddressAction(data.data.editAddress.address))
      if (router.pathname.split('/')[1] === 'profile') {
        router.replace('/profile')
      } else {
        router.replace('/checkout/summary')
      }
    }
  } catch (error) {
    dispatch(isErrorAction(true))
    dispatch(messageAction('Error al agregar la dirección'))
    setTimeout(() => {
      dispatch(messageAction(undefined))
      dispatch(isErrorAction(false))
    }, 3100)
  }
}

export const deleteAddress = (id: string, router: NextRouter) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch(loadingAction(true))
    const data = await axiosGraphqlUtils({
      query: deleteAddressGql,
      variables: {
        deleteAddressId: id
      }
    })

    if (data.errors) {
      dispatch(isErrorAction(true))
      dispatch(messageAction(data.errors[0].message))
      dispatch(loadingAction(false))
      Toast.fire({
        icon: 'error',
        title: data.errors[0].message
      })
      setTimeout(() => {
        dispatch(messageAction(undefined))
        dispatch(isErrorAction(false))
      }, 3100)
    } else {
      dispatch(isErrorAction(false))
      dispatch(messageAction(undefined))
      dispatch(deleteAddressAction(id))
      Toast.fire({
        icon: 'success',
        iconColor: '#2563EB',
        title: data.data.deleteAddress
      }).then(() => {
        router.reload()
        dispatch(loadingAction(false))
      })
    }
  } catch (error) {
    dispatch(isErrorAction(true))
    dispatch(messageAction('Error al eliminar la dirección'))
    dispatch(loadingAction(false))
    setTimeout(() => {
      dispatch(messageAction(undefined))
      dispatch(isErrorAction(false))
    }, 3100)
  }
}

export default directionSlice.reducer
