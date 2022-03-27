import {
  NextPage,
  GetStaticPropsResult,
  GetStaticPaths,
  GetStaticPathsResult,
  GetStaticProps
} from 'next'
import {
  ButtonAddProductComponent,
  CarouselProductSlugComponent,
  CountUiComponent,
  SizeSelectorProductSlugComponent
} from '../../components'
import { IProduct } from '../../interfaces'
import { ShopLayout } from '../../layouts'
import axios from 'axios'

export interface ISlugPageProps {
  product: IProduct
}

const SlugPage: NextPage<ISlugPageProps> = ({ product }) => {
  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <div className='w-full min-h-[100vh] flex flex-col xl:flex-row'>
        <div className='w-full xl:w-[60%] relative overflow-hidden'>
          <CarouselProductSlugComponent product={product} />
        </div>
        <div className='w-full xl:w-[40%] flex flex-col lg:flex-row xl:flex-col justify-center items-center lg:items-start xl:justify-start xl:items-center'>
          <div className='w-[90%]'>
            <h1 className='font-semibold text-3xl'>{product.title}</h1>
            <p className='text-xl my-2'>${product.price} </p>
            <h2 className='text-lg my-2'>Cantidad </h2>
            <CountUiComponent />
          </div>
          <div className='w-[90%]'>
            <h2 className='text-lg my-2'>Talla</h2>
            <SizeSelectorProductSlugComponent
              selectedSize={undefined}
              sizes={product.sizes}
            />
            <div className='w-full lg:hidden'>
              <ButtonAddProductComponent />
            </div>
            <h2 className='text-lg my-2'>Descripción</h2>
            <p className='text-sm'> {product.description} </p>
            <div className='w-full hidden lg:block'>
              <ButtonAddProductComponent />
            </div>
          </div>
        </div>
      </div>
    </ShopLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async ctx => {
  let result: GetStaticPathsResult<{ slog: string } | {}> = {
    paths: [{ params: {} }],
    fallback: true
  }
  try {
    const { data } = await axios({
      url: process.env.URL_API,
      method: 'POST',
      data: {
        query: `
        query Products {
          products {
            slug
          }
        }
        `
      }
    })
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
      destination: '/',
      permanent: false
    }
  }

  try {
    const { data } = await axios({
      url: process.env.URL_API,
      method: 'POST',
      data: {
        query: `
            query ProductBySlug {
              productBySlug(slug: ${JSON.stringify(params!.slug)}) {
                description
                images
                inStock
                price
                sizes
                title
              }
            }
              `
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
