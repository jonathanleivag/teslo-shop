import Link from 'next/link'
import { FC, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { useRouter } from 'next/router'

export interface ISummaryResumePersonalComponent {
  edit: boolean
}

export const SummaryResumePersonalComponent: FC<ISummaryResumePersonalComponent> = ({
  edit
}) => {
  const selectedOrder = useSelector(
    (state: RootState) => state.order.selectedOrder
  )
  const address = useSelector(
    (state: RootState) => state.address.selectedAddress
  )

  const router = useRouter()
  const [order, setOrder] = useState(
    router.pathname === '/checkout/summary' ? { address } : selectedOrder
  )
  const user = useSelector((state: RootState) => state.user.user)

  useEffect(() => {
    setOrder(
      router.pathname === '/checkout/summary' ? { address } : selectedOrder
    )

    return () => {}
  }, [address, router.pathname, selectedOrder])

  if (order?.address!.address === '') return <></>
  if (user === undefined) return <></>

  return (
    <>
      <div className='w-full border-b mb-3'>
        <h4 className='font-bold'>Dirección de entrega</h4>
        {edit && (
          <div className='w-full flex flex-row justify-end'>
            <Link href='/checkout/address?edit=address'>
              <a className='text-sm text-blue-600'>Editar</a>
            </Link>
          </div>
        )}

        <div className='w-full flex flex-row'>
          <div className='w-1/2 flex flex-row justify-start'>Nombre:</div>
          <div className='w-1/2 flex flex-row justify-end'>{user.name}</div>
        </div>

        <div className='w-full flex flex-row'>
          <div className='w-1/2 flex flex-row justify-start'>Dirección:</div>
          <div className='w-1/2 flex flex-row justify-end'>
            {order && order!.address!.address.length > 10
              ? order && order!.address!.address.substring(0, 10) + '...'
              : order && order!.address!.address}
          </div>
        </div>

        {order && order!.address!.address0 !== '' && (
          <div className='w-full flex flex-row'>
            <div className='w-1/2 flex flex-row justify-start'>
              Dirección 2:
            </div>
            <div className='w-1/2 flex flex-row justify-end'>
              {order &&
              order!.address?.address0 &&
              order!.address.address0.length > 10
                ? order && order!.address!.address0!.substring(0, 10) + '...'
                : order && order!.address!.address0!}
            </div>
          </div>
        )}

        <div className='w-full flex flex-row'>
          <div className='w-1/2 flex flex-row justify-start'>
            Código postal:
          </div>
          <div className='w-1/2 flex flex-row justify-end'>
            {order && order!.address!.postalCode}
          </div>
        </div>

        <div className='w-full flex flex-row'>
          <div className='w-1/2 flex flex-row justify-start'>País:</div>
          <div className='w-1/2 flex flex-row justify-end'>
            {order && order!.address?.country.label}
          </div>
        </div>

        <div className='w-full flex flex-row'>
          <div className='w-1/2 flex flex-row justify-start'>Phone:</div>
          <div className='w-1/2 flex flex-row justify-end'>
            {order && order!.address!.phono}
          </div>
        </div>
      </div>
      <h4 className='font-bold'>Productos</h4>
    </>
  )
}
