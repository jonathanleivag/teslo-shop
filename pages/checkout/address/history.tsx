import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { Cell, Column, HeaderCell, Table } from 'rsuite-table'
import 'rsuite-table/dist/css/rsuite-table.css'
import Swal from 'sweetalert2'
import { TCheckInputs, TitleUiComponent } from '../../../components'
import { ShopLayout } from '../../../layouts'
import { RootState } from '../../../store'
import { deleteAddress, selectedAddressAction } from '../../../store/features'
import { Toast } from '../../../utils'

const titleAndDescription: string = 'Historial de direcciones'

const HistoryPage: NextPage = () => {
  const address = useSelector((state: RootState) => state.address.address)
  const selectedAddress = useSelector(
    (state: RootState) => state.address.selectedAddress
  )
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    if (address.length === 0) {
      router.replace('/checkout/address')
    }
    return () => {}
  }, [address, router])

  const selected = (event: TCheckInputs) => {
    dispatch(selectedAddressAction(event))
  }

  const newAddress = () => {
    dispatch(selectedAddressAction(undefined))
    router.push('/checkout/address')
  }

  const handleDelete = (id: string) => {
    Swal.fire({
      title: '¿Quieres remover esta dirección?',
      confirmButtonColor: '#2563EB',
      showCancelButton: true,
      confirmButtonText: 'Remover'
    }).then(result => {
      if (result.isConfirmed) {
        dispatch(deleteAddress(id))
        dispatch(selectedAddressAction(undefined))

        Toast.fire({
          icon: 'success',
          iconColor: '#2563EB',
          title: 'Se removio la dirección'
        })
      }
    })
  }

  const handleEdit = (event: TCheckInputs) => {
    router.push('/checkout/address?edit=addressEdit')
    dispatch(selectedAddressAction(event))
  }
  // TODO: No puedes eliminar una dirección si tienes pedido asociado a esa dirección
  return (
    <ShopLayout
      title={titleAndDescription}
      pageDescription={titleAndDescription}
    >
      <TitleUiComponent>Historial de Direcciónes</TitleUiComponent>
      <Table data={address} className='max-h-[calc(100vh-250px)]'>
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
          <HeaderCell>Acción</HeaderCell>
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
      <div className='w-full flex flex-row justify-center my-3'>
        <div
          className={`w-full md:w-[40%] grid grid-cols-1 ${
            address.length < 3 || selectedAddress === undefined
              ? 'md:grid-cols-2'
              : 'md:grid-cols-1'
          } gap-4`}
        >
          {address.length < 3 && (
            <button
              onClick={newAddress}
              className='p-1 text-blue-600 border border-blue-600 rounded-full'
            >
              Nueva dirección
            </button>
          )}
          {selectedAddress?.address && (
            <button
              onClick={() => router.push('/checkout/summary')}
              className='p-1 text-white bg-blue-600 rounded-full'
            >
              Siguiente
            </button>
          )}
        </div>
      </div>
    </ShopLayout>
  )
}

export default HistoryPage
