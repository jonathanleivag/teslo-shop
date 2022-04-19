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
import { AdminSummaryTileComponent } from '../../components'
import { AdminLayout } from '../../layouts'

const AdminPage: NextPage = () => {
  return (
    <AdminLayout
      title={'Dashboard'}
      subTitle={'Estadisticas generales'}
      Icon={MdOutlineDashboard}
    >
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        <AdminSummaryTileComponent
          title={'50'}
          subTitle={'Ordenes totales'}
          Icon={AiFillCreditCard}
          classNameIcon='text-blue-500'
        />

        <AdminSummaryTileComponent
          title={'50'}
          subTitle={'Ordenes pagadas'}
          Icon={MdAttachMoney}
          classNameIcon='text-green-500'
        />

        <AdminSummaryTileComponent
          title={'50'}
          subTitle={'Ordenes pendientes'}
          Icon={MdOutlineCreditCardOff}
          classNameIcon='text-red-500'
        />

        <AdminSummaryTileComponent
          title={'50'}
          subTitle={'Clientes'}
          Icon={GrGroup}
          classNameIcon='text-red-500'
        />

        <AdminSummaryTileComponent
          title={'50'}
          subTitle={'Productos'}
          Icon={MdOutlineCategory}
          classNameIcon='text-yellow-500'
        />

        <AdminSummaryTileComponent
          title={'50'}
          subTitle={'Sin existencias'}
          Icon={MdCancelPresentation}
          classNameIcon='text-red-500'
        />

        <AdminSummaryTileComponent
          title={'50'}
          subTitle={'Bajo inventario'}
          Icon={MdProductionQuantityLimits}
          classNameIcon='text-yellow-500'
        />

        <AdminSummaryTileComponent
          title={'50'}
          subTitle={'Actualización en: '}
          Icon={BiTimeFive}
          classNameIcon='text-blue-500'
        />
      </div>
    </AdminLayout>
  )
}

export default AdminPage
