import { useRouter } from 'next/router'
import { FC } from 'react'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { Cell, Column, HeaderCell, Table } from 'rsuite-table'
import 'rsuite-table/dist/css/rsuite-table.css'
import Swal from 'sweetalert2'
import { IHistoryPageProps } from '../../pages/checkout/address/history'
import { RootState } from '../../store'
import { deleteAddress, selectedAddressAction } from '../../store/features'
import { TCheckInputs } from './FormCheckoutComponent'

export interface IHistoryCheckoutComponent extends IHistoryPageProps {
  noSelected?: boolean
}

export const HistoryCheckoutComponent: FC<IHistoryCheckoutComponent> = ({
  address,
  noSelected = false
}) => {
  const dispatch = useDispatch()
  const selectedAddress = useSelector(
    (state: RootState) => state.address.selectedAddress
  )
  const router = useRouter()

  const selected = (event: TCheckInputs) => {
    dispatch(selectedAddressAction(event))
  }

  const handleDelete = (id: string) => {
    Swal.fire({
      title: '¿Quieres remover esta dirección?',
      confirmButtonColor: '#2563EB',
      showCancelButton: true,
      confirmButtonText: 'Remover'
    }).then(result => {
      if (result.isConfirmed) {
        dispatch(deleteAddress(id, router))
        dispatch(selectedAddressAction(undefined))
      }
    })
  }

  const handleEdit = (event: TCheckInputs) => {
    dispatch(selectedAddressAction(event))
    if (noSelected) {
      router.push('/profile/address/new?edit=addressEdit')
    } else {
      router.push('/checkout/address?edit=addressEdit')
    }
  }

  return (
    <Table data={address} className='max-h-[calc(100vh-250px)]'>
      {!noSelected && (
        <Column width={100} sortable fixed resizable>
          <HeaderCell>Seleccionado</HeaderCell>
          <Cell>
            {(rowData: TCheckInputs) => {
              return (
                <button
                  onClick={() => selected(rowData)}
                  className='w-full h-full flex flex-row justify-center items-center'
                >
                  <input
                    type='radio'
                    checked={selectedAddress?.id === rowData.id}
                    onChange={() => {}}
                  />
                </button>
              )
            }}
          </Cell>
        </Column>
      )}

      <Column width={200} resizable>
        <HeaderCell>Dirección</HeaderCell>
        <Cell dataKey='address' />
      </Column>

      <Column width={200} resizable>
        <HeaderCell>Dirección 2</HeaderCell>
        <Cell>
          {(rowData, _) => {
            return <div>{rowData.address0 || ' - '}</div>
          }}
        </Cell>
      </Column>

      <Column width={200} resizable>
        <HeaderCell>Ciudad</HeaderCell>
        <Cell dataKey='city' />
      </Column>

      <Column width={200} resizable>
        <HeaderCell>Tel</HeaderCell>
        <Cell dataKey='phono' />
      </Column>

      <Column width={200} resizable>
        <HeaderCell>País</HeaderCell>
        <Cell dataKey='country.value' />
      </Column>

      <Column width={200} resizable>
        <HeaderCell> </HeaderCell>
        <Cell>
          {(rowData: TCheckInputs) => (
            <>
              <button
                onClick={() => handleDelete(rowData.id)}
                className='bg-red-600 p-1 mx-1'
              >
                <AiFillDelete className='text-white' />
              </button>
              <button
                onClick={() => handleEdit(rowData)}
                className='bg-yellow-400 p-1 mx-1'
              >
                <AiFillEdit className='text-white' />
              </button>
            </>
          )}
        </Cell>
      </Column>
    </Table>
  )
}
