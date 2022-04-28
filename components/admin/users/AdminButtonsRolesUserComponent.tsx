import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from 'react'
import { TRole } from '../../../../../Node Ts/teslo-shop-api/src/models/UserModel'
import { updateRoleGql } from '../../../gql'
import { axiosGraphqlUtils, Toast } from '../../../utils'
import { useSession0 } from '../../../hooks/useSession0'
import { IUser } from '../../../store/features/user/userSlice'

export interface IAdminButtonsRolesUserComponentProps {
  role: TRole
  id: string
  setUsers: Dispatch<SetStateAction<IUser[]>>
}

export const AdminButtonsRolesUserComponent: FC<IAdminButtonsRolesUserComponentProps> = ({
  role,
  id,
  setUsers
}) => {
  const [role0, setRole0] = useState<TRole>(role)
  const session = useSession0()

  const changeRole = async (event: ChangeEvent<HTMLInputElement>) => {
    setRole0(event.target.id.split('-')[0] as TRole)
    try {
      const data = await axiosGraphqlUtils({
        query: updateRoleGql,
        variables: {
          input: {
            idUser: session?.user.id,
            idUserUpdate: id,
            role: event.target.id.split('-')[0]
          }
        }
      })

      if (data.errors) {
        Toast.fire({
          icon: 'error',
          title: data.errors[0].message
        })
      } else {
        Toast.fire({
          icon: 'success',
          iconColor: '#2563EB',
          title: data.data.updateRole
        })
        setUsers(users =>
          users.map(user => {
            user.role = event.target.id.split('-')[0]
            return user
          })
        )
      }
    } catch (error) {
      Toast.fire({
        icon: 'error',
        title: 'Error al actualizar el rol'
      })
      console.error(error)
    }
  }

  return (
    <div className='w-full flex flex-row justify-center items-center gap-2'>
      <div className='flex flex-row gap-1 justify-center items-center'>
        <input
          checked={role0 === 'admin'}
          onChange={changeRole}
          className='cursor-pointer'
          type='radio'
          id={`admin-${id}`}
          name={id}
        />
        <label className='cursor-pointer' htmlFor={`admin-${id}`}>
          Administrador
        </label>
      </div>
      <div className='flex flex-row gap-1 justify-center items-center'>
        <input
          checked={role0 === 'client'}
          className='cursor-pointer'
          onChange={changeRole}
          type='radio'
          id={`client-${id}`}
          name={id}
        />
        <label className='cursor-pointer' htmlFor={`client-${id}`}>
          Cliente
        </label>
      </div>
    </div>
  )
}
