import { GetServerSideProps, GetServerSidePropsResult, NextPage } from 'next'
import Link from 'next/link'
import { LoginLayout } from '../../layouts'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { registerValidation } from '../../validations'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../../store/features'
import { RootState } from '../../store'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'

export type TRegisterInputs = {
  name: string
  email: string
  password: string
  password0: string
}

const RegisterPage: NextPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<TRegisterInputs>({
    mode: 'onChange',
    resolver: yupResolver(registerValidation)
  })

  const user = useSelector((state: RootState) => state.user)

  const dispatch = useDispatch()

  const router = useRouter()

  const onSubmit = handleSubmit(async (input: TRegisterInputs) => {
    dispatch(registerUser(input))
  })

  return (
    <LoginLayout title={'Crear cuenta'}>
      <div className='w-screen min-h-[calc(100vh-150px)] flex flex-row justify-center items-center'>
        <div className='w-[90%] md:w-[60%] xl:w-[40%] 2xl:w-[30%] overflow-hidden flex flex-col items-center'>
          <Link href='/' passHref>
            <a>
              <span className='prose prose-2xl font-bold'>Teslo |</span>
              <span className='prose prose-xl font-sans'> Shop</span>
            </a>
          </Link>
          {user.error && (
            <div className='w-full h-6 rounded-full px-3 overflow-hidden bg-red-600'>
              <p className='text-white'> {user.error} </p>
            </div>
          )}
          {user.isError && (
            <div className='w-full h-8 py-1 rounded-full px-3 overflow-hidden bg-red-600'>
              <p className='text-white'> {user.isError} </p>
            </div>
          )}

          {user.message && (
            <div className='w-full h-8 py-1 rounded-full px-3 overflow-hidden bg-green-600'>
              <p className='text-white'> {user.message} </p>
            </div>
          )}
          <div className='w-full mt-3'>
            <h1 className='text-lg'>Crear cuenta</h1>
          </div>
          <div className='w-full'>
            <form className='w-full mb-5' onSubmit={onSubmit}>
              <div className='w-full flex flex-col gap-1 mb-2'>
                <label htmlFor='name'>Nombre</label>
                <input
                  type='text'
                  id='name'
                  placeholder='Jonathan'
                  className='w-full border-2 border-gray-400 rounded-lg py-2 px-4'
                  {...register('name')}
                />
                {errors.name?.message && (
                  <div className='w-full h-8  py-1 rounded-full px-3 overflow-hidden bg-red-600'>
                    <p className='text-white'> {errors.name.message} </p>
                  </div>
                )}
              </div>

              <div className='w-full flex flex-col gap-1 mb-2'>
                <label htmlFor='email'>Email</label>
                <input
                  type='email'
                  id='email'
                  autoComplete='username'
                  placeholder='email@email.cl'
                  className='w-full border-2 border-gray-400 rounded-lg py-2 px-4'
                  {...register('email')}
                />
                {errors.email?.message && (
                  <div className='w-full h-8  py-1 rounded-full px-3 overflow-hidden bg-red-600'>
                    <p className='text-white'> {errors.email.message} </p>
                  </div>
                )}
              </div>

              <div className='w-full flex flex-col gap-1 mb-2'>
                <label htmlFor='password'>Contraseña</label>
                <input
                  type='password'
                  id='password'
                  placeholder='********'
                  autoComplete='new-password'
                  className='w-full border-2 border-gray-400 rounded-lg py-2 px-4'
                  {...register('password')}
                />
                {errors.password?.message && (
                  <div className='w-full h-8  py-1 rounded-full px-3 overflow-hidden bg-red-600'>
                    <p className='text-white'> {errors.password.message} </p>
                  </div>
                )}
              </div>

              <div className='w-full flex flex-col gap-1'>
                <label htmlFor='password'>Repita la contraseña</label>
                <input
                  type='password'
                  id='password0'
                  placeholder='********'
                  autoComplete='new-password'
                  className='w-full border-2 border-gray-400 rounded-lg py-2 px-4'
                  {...register('password0')}
                />
                {errors.password0?.message && (
                  <div className='w-full h-8  py-1 rounded-full px-3 overflow-hidden bg-red-600'>
                    <p className='text-white'> {errors.password0.message} </p>
                  </div>
                )}
              </div>

              <div className='w-full my-5'>
                <button
                  type='submit'
                  className='w-full py-2 border border-blue-600 bg-blue-600 text-white rounded-full'
                >
                  Ingresar
                </button>
              </div>
            </form>
            <div className='w-full flex flex-row justify-center md:justify-end'>
              <Link
                href={`/auth/login?redirect=${(router.query
                  .redirect as string) || '/'}`}
                passHref
              >
                <a className='text-blue-600 border-b border-transparent hover:border-blue-600'>
                  ¿Ya tienes cuenta?
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </LoginLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  let resp: GetServerSidePropsResult<{}> = { props: {} }

  const session = await getSession({ req: ctx.req })
  const { redirect = '/' } = ctx.query

  if (session) {
    resp = {
      redirect: {
        destination: redirect.toString(),
        permanent: false
      }
    }
  } else {
    resp = { props: {} }
  }

  return resp
}

export default RegisterPage
