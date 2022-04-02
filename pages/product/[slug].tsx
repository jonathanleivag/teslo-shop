import axios from 'axios'
import {
  GetStaticPaths,
  GetStaticPathsResult,
  GetStaticProps,
  GetStaticPropsResult,
  NextPage
} from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  ButtonAddProductComponent,
  CarouselProductSlugComponent,
  CountUiComponent,
  RemoveProductComponent,
  ShareButtonProduct,
  SizeSelectorProductSlugComponent
} from '../../components'
import { ProductBySlugGql, SlugProductsGql } from '../../gql'
import { IProduct, TValidSize } from '../../interfaces'
import { ShopLayout } from '../../layouts'
import { RootState } from '../../store'
import { ICartData } from '../../store/features'

export interface ISlugPageProps {
  product: IProduct
}

const SlugPage: NextPage<ISlugPageProps> = ({ product }) => {
  const [count, setCount] = useState<number>(1)
  const [tempCartProduct, setTempCartProduct] = useState<ICartData>({
    id: product.id,
    image: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: count
  })

  const [urlCount, setUrlCount] = useState<number | undefined>(
    count === 1 ? undefined : count
  )

  const [selected, setSelected] = useState<boolean>(false)
  const cart = useSelector((state: RootState) => state.cart.cart)
  const router = useRouter()

  useEffect(() => {
    if (tempCartProduct.size) {
      const existsProductInTheCart = cart.filter(
        c => c.id === product.id && c.size === tempCartProduct.size
      )[0]

      if (existsProductInTheCart) {
        setCount(existsProductInTheCart.quantity)
        setSelected(true)
      } else {
        setSelected(false)
        if (!router.query.quantity) setCount(1)
      }
    }

    return () => {}
  }, [tempCartProduct.size, cart, product.id, router.query.quantity])

  useEffect(() => {
    if (router.query.size) {
      setTempCartProduct(temp => ({
        ...temp,
        size: router.query.size as TValidSize
      }))
    }
    return () => {}
  }, [router.query.size])

  useEffect(() => {
    if (router.query.quantity && !selected) {
      if (+router.query.quantity <= product.inStock) {
        setCount(+router.query.quantity)
      } else {
        setCount(1)
      }
    }

    return () => {}
  }, [product.inStock, router.query.quantity, selected])

  useEffect(() => {
    setUrlCount(count === 1 ? undefined : count)
    return () => {}
  }, [count])

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
            <CountUiComponent
              setTempCartProduct={setTempCartProduct}
              inStock={product.inStock}
              count={count}
              setCount={setCount}
            />
          </div>
          <div className='w-[90%]'>
            <h2 className='text-lg my-2'>Talla</h2>
            <SizeSelectorProductSlugComponent
              selectedSize={tempCartProduct.size}
              sizes={product.sizes}
              setTempCartProduct={setTempCartProduct}
            />
            <div className='w-full lg:hidden'>
              <ButtonAddProductComponent
                tempCartProduct={tempCartProduct}
                inStock={product.inStock}
                selected={selected}
              />
              {selected && <RemoveProductComponent product={tempCartProduct} />}
            </div>
            <h2 className='text-lg my-2'>Descripción</h2>
            <ShareButtonProduct
              slug={product.slug}
              size={
                router.query.size
                  ? (router.query.size as TValidSize)
                  : tempCartProduct.size
              }
              quantity={
                router.query.quantity ? +router.query.quantity! : urlCount
              }
            />
            <p className='text-sm'> {product.description} </p>
            <div className='w-full hidden lg:block'>
              <ButtonAddProductComponent
                tempCartProduct={tempCartProduct}
                inStock={product.inStock}
                selected={selected}
              />
              {selected && <RemoveProductComponent product={tempCartProduct} />}
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
      data: { query: SlugProductsGql() }
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
      data: { query: ProductBySlugGql(params!.slug as string) }
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
