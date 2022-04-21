import { NextPage } from 'next'
import { useState, useEffect } from 'react'
import { GrGroup } from 'react-icons/gr'
import { Cell, Column, HeaderCell, Table } from 'rsuite-table'
import 'rsuite-table/dist/css/rsuite-table.css'
import useSWR from 'swr'
import {
  AdminButtonsRolesUserComponent,
  FullScreenLoadingUiComponent
} from '../../components'
import { AdminLayout } from '../../layouts/AdminLayout'
import { IUser } from '../../store/features'

const fetcher = (url: string) => fetch(url).then(r => r.json())

const UsersPage: NextPage = () => {
  const { data, error } = useSWR<IUser[]>('/api/admin/users', fetcher)
  const [users, setUsers] = useState<IUser[]>([])

  useEffect(() => {
    if (data) setUsers(data)
    return () => {}
  }, [data, error])

  if (!error && !data) return <FullScreenLoadingUiComponent />

  if (error) {
    return <p className='text-red-600'> Error al cargar la información </p>
  }

  return (
    <AdminLayout
      title={'Usuarios'}
      subTitle={'Manteción de usuarios'}
      Icon={GrGroup}
    >
      <Table
        renderEmpty={() => (
          <div className='w-full h-full flex flex-row justify-center items-center'>
            <p>No hay ordenes</p>
          </div>
        )}
        data={users || []}
      >
        <Column width={250} sortable resizable>
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
        <Column width={300} resizable>
          <HeaderCell>Rol</HeaderCell>
          <Cell>
            {(rowData, _) => {
              return (
                <AdminButtonsRolesUserComponent
                  role={rowData.role}
                  id={rowData.id}
                  setUsers={setUsers}
                />
              )
            }}
          </Cell>
        </Column>
      </Table>
    </AdminLayout>
  )
}

export default UsersPage
