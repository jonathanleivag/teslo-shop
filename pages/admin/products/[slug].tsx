import { yupResolver } from '@hookform/resolvers/yup'
import '@pathofdev/react-tag-input/build/index.css'
import { GetServerSideProps, GetServerSidePropsResult, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { FieldError, useForm } from 'react-hook-form'
import { AiOutlineEdit, AiOutlineSave } from 'react-icons/ai'
import {
  AdminButtonDeleteComponent,
  AdminButtonFileComponent,
  AdminCheckboxSizeComponents,
  AdminErrorFormFormComponent,
  AdminImageComponent,
  AdminRadioButtonGenderComponent,
  AdminRadioButtonTypeComponent,
  AdminTagComponent
} from '../../../components'
import {
  addProductGql,
  ProductBySlugAdminGql,
  updateProductGql
} from '../../../gql'
import { useSession0 } from '../../../hooks/useSession0'
import { IProduct, TGender, TValidSize, TValidType } from '../../../interfaces'
import { AdminLayout } from '../../../layouts'
import { axiosGraphqlUtils } from '../../../utils'
import { Toast } from '../../../utils/toastUtil'
import { productValidation } from '../../../validations'

export interface IProductForm {
  description: string
  inStock: number
  price: number
  sizes: TValidSize[]
  slug: string
  tags: string[]
  title: string
  type: TValidType
  gender: TGender
  images: string[]
}

export interface ISlugPageProps {
  product: IProduct
  edit: boolean
}

const SlugPage: NextPage<ISlugPageProps> = ({ product, edit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch
  } = useForm<IProductForm>({
    defaultValues: {
      ...product,
      inStock: product.inStock || 0,
      price: product.price || 1
    },
    resolver: yupResolver(productValidation),
    mode: 'onChange'
  })

  const session = useSession0()
  const router = useRouter()

  const [errorTag, setErrorTag] = useState<FieldError | undefined>(undefined)
  const [errorCheckbox, setErrorCheckbox] = useState<FieldError | undefined>(
    undefined
  )

  useEffect(() => {
    const subcription = watch((values, { name, type }) => {
      if (name === 'title') {
        const newSlug =
          values.title
            ?.trim()
            .replaceAll(' ', '_')
            .replaceAll("'", '')
            .toLocaleLowerCase() || ''

        setValue('slug', newSlug)
      }
    })
    return () => subcription.unsubscribe()
  }, [setValue, watch])

  const onSubmit = handleSubmit<IProduct>(async value => {
    if (errorCheckbox === undefined && errorTag === undefined) {
      try {
        const data = await axiosGraphqlUtils({
          query: edit ? updateProductGql : addProductGql,
          variables: {
            input: {
              product: value,
              idUser: session?.user.id
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
            title: edit ? data.data.updateProduct : data.data.addProduct
          })
          if (!edit) router.replace(`/admin/products/${value.slug}`)
        }
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: 'Error al agregar/actualizar el producto'
        })
        console.error(error)
      }
    }
  })

  return (
    <AdminLayout
      title={'Producto'}
      subTitle={edit ? `Editando: ${product.title}` : 'Nuevo Producto'}
      titleHead={edit ? product.title : 'Nuevo Producto'}
      Icon={AiOutlineEdit}
    >
      <form className='flex flex-col items-center' onSubmit={onSubmit}>
        <AdminButtonDeleteComponent id={product.id} />
        <div className='w-[90%] grid grid-cols-1 md:grid-cols-2 gap-2'>
          <div className='container_form_product'>
            <label htmlFor='title'>Título</label>
            <input
              className='input_form_product'
              type='text'
              id='title'
              placeholder='Título'
              {...register('title')}
            />
            <AdminErrorFormFormComponent error={errors.title} />
          </div>

          <div className='container_form_product'>
            <label htmlFor='inStock'>Inventario</label>
            <input
              className='input_form_product'
              type='number'
              id='inStock'
              placeholder='Inventario'
              {...register('inStock')}
            />
            <AdminErrorFormFormComponent error={errors.inStock} />
          </div>

          <div className='container_form_product'>
            <label htmlFor='price'>Precio (USD)</label>
            <input
              className='input_form_product'
              type='number'
              id='price'
              placeholder='Precio (USD)'
              {...register('price')}
            />
            <AdminErrorFormFormComponent error={errors.price} />
          </div>

          <div className='container_form_product'>
            <label htmlFor='slug'>Slug - Url</label>
            <input
              className='input_form_product'
              type='text'
              id='slug'
              placeholder='Slug - Url'
              {...register('slug')}
            />
            <AdminErrorFormFormComponent error={errors.slug} />
          </div>

          <div className='container_form_product col-span-1 md:col-span-2'>
            <label htmlFor='description'>Descripción</label>
            <textarea
              className='textarea_form_product '
              id='description'
              placeholder='Descripción'
              {...register('description')}
            />
            <AdminErrorFormFormComponent error={errors.description} />
          </div>

          <div className='container_form_product'>
            <label htmlFor='price'>Tipo</label>
            <AdminRadioButtonTypeComponent
              typeSelect={getValues('type')}
              setValue={setValue}
            />
          </div>

          <div className='container_form_product'>
            <label htmlFor='price'>Género</label>
            <AdminRadioButtonGenderComponent
              genderSelect={getValues('gender')}
              setValue={setValue}
            />
          </div>

          <div className='container_form_product'>
            <label htmlFor='size'>Talla</label>
            <AdminCheckboxSizeComponents
              checkbox={getValues('sizes')}
              setValue={setValue}
              setErrorCheckbox={setErrorCheckbox}
            />
            <AdminErrorFormFormComponent error={errorCheckbox} />
          </div>

          <div className='container_form_product'>
            <label htmlFor='tag'>Etiquetas</label>
            <AdminTagComponent
              setValue={setValue}
              selectTags={getValues('tags')}
              setErrorTag={setErrorTag}
            />
            <p className='text-xs'>[Enter] para agregar etiqueta</p>
            <AdminErrorFormFormComponent error={errorTag} />
          </div>

          <div className='container_form_product justify-center items-center'>
            <AdminButtonFileComponent
              setValue={setValue}
              getValues={getValues}
            />
          </div>

          <div className='container_form_product justify-center items-center'>
            <div className='grid_container_radio_button_produts'>
              <AdminImageComponent
                title={product.title}
                getValues={getValues}
                setValue={setValue}
              />
            </div>
            {getValues('images').length < 2 && (
              <div className='w-full flex flex-row justify-center items-center my-3'>
                <div className='w-[80%] flex flex-row justify-center items-center text-white bg-red-600 rounded-full'>
                  <span> Al menos necesitas dos imagenes </span>
                </div>
              </div>
            )}
          </div>

          <div className='container_form_product items-center col-span-1 md:col-span-2'>
            <button
              type='submit'
              className='w-full md:w-[40%] h-10 rounded-full my-3 flex flex-row gap-2 justify-center items-center text-white bg-blue-600'
            >
              <AiOutlineSave />
              <span>{edit ? 'Guardar' : 'Crear '}</span>
            </button>
          </div>
        </div>
      </form>
    </AdminLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  let resp: GetServerSidePropsResult<IProduct | {}> = { props: {} }

  const error = {
    redirect: {
      destination: '/admin/products',
      permanent: false
    }
  }

  try {
    const { slug } = params as { slug: string }

    if (slug !== 'new') {
      const data = await axiosGraphqlUtils({
        query: ProductBySlugAdminGql,
        variables: {
          slug: slug
        }
      })
      if (data.errors) {
        resp = error
      } else {
        resp = {
          props: {
            edit: true,
            product: data.data.productBySlug
          }
        }
      }
    } else {
      resp = {
        props: {
          edit: false,
          product: {
            id: '',
            title: '',
            slug: '',
            description: '',
            price: 0,
            inStock: 0,
            type: 'shirts',
            gender: 'woman',
            sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
            images: [],
            tags: ['Teslo', 'Shop']
          }
        }
      }
    }
  } catch (e) {
    resp = error
  }

  return resp
}

export default SlugPage
