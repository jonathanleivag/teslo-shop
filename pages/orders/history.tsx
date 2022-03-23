import { NextPage } from 'next'
import { TitleUiComponent } from '../../components'
import { ShopLayout } from '../../layouts'
import { Table, Column, HeaderCell, Cell } from 'rsuite-table'
import 'rsuite-table/dist/css/rsuite-table.css'

const dataList = [
  {
    id: 1,
    name: 'Jonathan Leiva Gómez',
    email: 'email@jonathanleivag.cl',
    state: 'pagado'
  },
  { id: 2, name: 'Kym posible', email: 'kym@email.cl', state: 'pagado' },
  { id: 3, name: 'Raúl Gómez', email: 'rgomez@email.com', state: 'pagado' }
]

const HistoryPage: NextPage = () => {
  return (
    <ShopLayout
      title={'Historial de ordenes'}
      pageDescription={'Historial de ordenes'}
    >
      <TitleUiComponent>Historial de ordenes</TitleUiComponent>
      <Table data={dataList} className='min-h-[calc(100vh-250px)]'>
        <Column width={100} sortable fixed resizable>
          <HeaderCell>ID</HeaderCell>
          <Cell dataKey='id' />
        </Column>

        <Column width={200} resizable>
          <HeaderCell>Nombre</HeaderCell>
          <Cell dataKey='name' />
        </Column>

        <Column width={200} resizable>
          <HeaderCell>Email</HeaderCell>
          <Cell>
            {(rowData, _) => {
              return <a href={`mailto:${rowData.email}`}>{rowData.email}</a>
            }}
          </Cell>
        </Column>

        <Column width={100} align='center' resizable>
          <HeaderCell>Estado</HeaderCell>
          <Cell>
            {(rowData, _) => (
              <div className='w-full border border-green-600 rounded-full px-1'>
                <p className='text-green-600'> {rowData.state} </p>
              </div>
            )}
          </Cell>
        </Column>

        <Column width={150} align='center' resizable>
          <HeaderCell>Orden</HeaderCell>
          <Cell>
            {(rowData, _) => <a className='text-blue-600'> ver orden </a>}
          </Cell>
        </Column>
      </Table>
    </ShopLayout>
  )
}

export default HistoryPage
