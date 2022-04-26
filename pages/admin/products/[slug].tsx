import { yupResolver } from '@hookform/resolvers/yup'
import '@pathofdev/react-tag-input/build/index.css'
import {
  GetStaticPaths,
  GetStaticPathsResult,
  GetStaticProps,
  GetStaticPropsResult,
  NextPage
} from 'next'
import { useEffect, useState } from 'react'
import { FieldError, useForm } from 'react-hook-form'
import { AiOutlineEdit, AiOutlineSave } from 'react-icons/ai'
import {
  AdminCheckboxSizeComponents,
  AdminErrorFormFormComponent,
  AdminRadioButtonGenderComponent,
  AdminRadioButtonTypeComponent,
  AdminTagComponent
} from '../../../components'
import {
  ProductBySlugAdminGql,
  SlugProductsGql,
  updateProductGql
} from '../../../gql'
import { IProduct, TGender, TValidSize, TValidType } from '../../../interfaces'
import { AdminLayout } from '../../../layouts'
import { axiosGraphqlUtils } from '../../../utils'
import { productValidation } from '../../../validations'
import { Toast } from '../../../utils/toastUtil'
import { useSession0 } from '../../../hooks/useSession0'

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
}

export interface ISlugPageProps {
  product: IProduct
}

const SlugPage: NextPage<ISlugPageProps> = ({ product }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch
  } = useForm<IProduct>({
    defaultValues: {
      ...product,
      inStock: product.inStock || 0,
      price: product.price || 1
    },
    resolver: yupResolver(productValidation),
    mode: 'onChange'
  })

  const session = useSession0()

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
          query: updateProductGql,
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
            title: data.data.updateProduct
          })
        }
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: 'Error al actualizar el producto'
        })
      }
    }
  })

  return (
    <AdminLayout
      title={'Producto'}
      subTitle={`Editando: ${product.title}`}
      titleHead={product.title}
      Icon={AiOutlineEdit}
    >
      <form className='flex flex-row justify-center' onSubmit={onSubmit}>
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

          <div className='container_form_product items-center col-span-1 md:col-span-2'>
            <button
              type='submit'
              className='w-full md:w-[40%] h-10 rounded-full my-3 flex flex-row gap-2 justify-center items-center text-white bg-blue-600'
            >
              <AiOutlineSave />
              <span>Guardar</span>
            </button>
          </div>
        </div>
      </form>
    </AdminLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async ctx => {
  let result: GetStaticPathsResult<{ slog: string } | {}> = {
    paths: [{ params: {} }],
    fallback: true
  }
  try {
    const data = await axiosGraphqlUtils({ query: SlugProductsGql })

    if (data.errors) {
      console.error(data.errors)
    } else {
      result = {
        paths: data.data.products.map((product: IProduct) => ({
          params: {
            slug: product.slug
          }
        })),
        fallback: 'blocking'
      }
    }
  } catch (error) {
    console.error(error)
  }
  return result
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let resp: GetStaticPropsResult<IProduct | {}> = { props: {} }

  const error = {
    redirect: {
      destination: '/admin/products',
      permanent: false
    }
  }

  try {
    const data = await axiosGraphqlUtils({
      query: ProductBySlugAdminGql,
      variables: {
        slug: params!.slug as string
      }
    })

    if (data.errors) {
      resp = error
    } else {
      resp = {
        props: {
          product: data.data.productBySlug
        },
        revalidate: 86400
      }
    }
  } catch (e) {
    resp = error
  }

  return resp
}

export default SlugPage
