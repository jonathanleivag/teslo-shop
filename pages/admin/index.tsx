import { NextPage } from 'next'
import { AiFillCreditCard } from 'react-icons/ai'
import { BiTimeFive } from 'react-icons/bi'
import { GrGroup } from 'react-icons/gr'
import {
  MdAttachMoney,
  MdCancelPresentation,
  MdOutlineCategory,
  MdOutlineCreditCardOff,
  MdOutlineDashboard,
  MdProductionQuantityLimits
} from 'react-icons/md'
import useSWR from 'swr'
import { AdminSummaryTileComponent } from '../../components'
import { AdminLayout } from '../../layouts'
import { FullScreenLoadingUiComponent } from '../../components/ui/FullScreenLoadingUiComponent'
import { useState, useEffect } from 'react'
import { NEXT_PUBLIC_REVALIDATE_DASHBOARD } from '../../utils'

export interface IDashboard {
  numberOfOrders: number
  paidOrders: number
  numberOfClient: number
  numberOfProducts: number
  productsWithNoInventory: number
  lowInventory: number
  noPaidOrders: number
}

const fetcher = (url: string) => fetch(url).then(r => r.json())

const AdminPage: NextPage = () => {
  const { data, error } = useSWR<IDashboard>('/api/admin/dashboard', fetcher, {
    refreshInterval: NEXT_PUBLIC_REVALIDATE_DASHBOARD * 1000
  })

  const [refreshIn, setRefreshIn] = useState<number>(
    NEXT_PUBLIC_REVALIDATE_DASHBOARD
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshIn(refreshIn =>
        refreshIn > 0 ? refreshIn - 1 : NEXT_PUBLIC_REVALIDATE_DASHBOARD
      )
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  if (!error && !data) return <FullScreenLoadingUiComponent />

  if (error) {
    return <p className='text-red-600'> Error al cargar la información </p>
  }

  const {
    numberOfOrders,
    paidOrders,
    numberOfClient,
    numberOfProducts,
    productsWithNoInventory,
    lowInventory,
    noPaidOrders
  } = data!

  return (
    <AdminLayout
      title={'Dashboard'}
      subTitle={'Estadisticas generales'}
      Icon={MdOutlineDashboard}
      titleHead={'Dashboard'}
    >
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        <AdminSummaryTileComponent
          title={numberOfOrders.toString()}
          subTitle={'Ordenes totales'}
          Icon={AiFillCreditCard}
          classNameIcon='text-blue-500'
          url='/admin/orders'
        />

        <AdminSummaryTileComponent
          title={paidOrders.toString()}
          subTitle={'Ordenes pagadas'}
          Icon={MdAttachMoney}
          classNameIcon='text-green-500'
          url='/admin/orders/status/paid'
        />

        <AdminSummaryTileComponent
          title={noPaidOrders.toString()}
          subTitle={'Ordenes pendientes'}
          Icon={MdOutlineCreditCardOff}
          classNameIcon='text-red-500'
          url='/admin/orders/status/pending'
        />

        <AdminSummaryTileComponent
          title={numberOfClient.toString()}
          subTitle={'Clientes'}
          Icon={GrGroup}
          classNameIcon='text-red-500'
          url='/admin/users'
        />

        <AdminSummaryTileComponent
          title={numberOfProducts.toString()}
          subTitle={'Productos'}
          Icon={MdOutlineCategory}
          classNameIcon='text-yellow-500'
          url='/admin/products'
        />

        <AdminSummaryTileComponent
          title={productsWithNoInventory.toString()}
          subTitle={'Sin existencias'}
          Icon={MdCancelPresentation}
          classNameIcon='text-red-500'
          url='/admin/products/status/no_inventory'
        />

        <AdminSummaryTileComponent
          title={lowInventory.toString()}
          subTitle={'Bajo inventario'}
          Icon={MdProductionQuantityLimits}
          classNameIcon='text-yellow-500'
          url='/admin/products/status/low_inventory'
        />

        <AdminSummaryTileComponent
          title={refreshIn.toString()}
          subTitle={'Actualización en: '}
          Icon={BiTimeFive}
          classNameIcon='text-blue-500'
          className='cursor-not-allowed'
        />
      </div>
    </AdminLayout>
  )
}

export default AdminPage
