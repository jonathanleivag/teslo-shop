import { ChangeEvent, FC, useRef } from 'react'
import { BiCloudUpload } from 'react-icons/bi'
import { useSession0 } from '../../../hooks/useSession0'
import axios from 'axios'
import { NEXT_PUBLIC_URL_API } from '../../../utils'
import { UseFormGetValues, UseFormSetValue } from 'react-hook-form'
import { IProductForm } from '../../../pages/admin/products/[slug]'

export interface IAdminButtonFileComponent {
  setValue: UseFormSetValue<IProductForm>
  getValues: UseFormGetValues<IProductForm>
}

export type TResp = {
  message: string
  url: string
}

export const AdminButtonFileComponent: FC<IAdminButtonFileComponent> = ({
  setValue,
  getValues
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const session = useSession0()

  const hanbleOnFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files || event.target.files!.length !== 0) {
      try {
        Array.from(event.target.files!).forEach(async file => {
          const formData = new FormData()
          formData.append('file', file)
          formData.append('idUser', session?.user.id!)
          const { data } = await axios.post<TResp>(
            `${NEXT_PUBLIC_URL_API}api/uploadImage`,
            formData
          )
          setValue('images', [...getValues('images'), data.url], {
            shouldValidate: true
          })
        })
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <>
      <input
        ref={fileInputRef}
        type='file'
        name='file'
        id='file'
        multiple
        accept='image/png, image/gif, image/jpeg, image/jpg'
        className='hidden'
        onChange={hanbleOnFileChange}
      />
      <button
        type='button'
        onClick={() => fileInputRef.current?.click()}
        className='w-full lg:w-[40%] flex flex-row justify-center items-center gap-1 bg-blue-600 text-white rounded-full py-1 px-2'
      >
        <BiCloudUpload />
        <span>Cargar imagen</span>
      </button>
    </>
  )
}
