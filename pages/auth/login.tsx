import { NextPage } from 'next'
import Link from 'next/link'
import { LoginLayout } from '../../layouts'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../store/features'
import { RootState } from '../../store'
import { useRouter } from 'next/router'

export type TLoginInputs = {
  email: string
  password: string
}

const LoginPage: NextPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<TLoginInputs>({ mode: 'onTouched' })

  const dispatch = useDispatch()
  const router = useRouter()

  const user = useSelector((state: RootState) => state.user)

  const onSubmit = handleSubmit(async (input: TLoginInputs) => {
    dispatch(login(input))
    const redirect = (router.query.redirect as string) || '/'
    router.replace(redirect)
  })

  return (
    <LoginLayout title={'Ingresar'}>
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
            <h1 className='text-lg'>Iniciar Sesión</h1>
          </div>
          <div className='w-full'>
            <form className='w-full mb-5' onSubmit={onSubmit} noValidate>
              <div className='w-full flex flex-col gap-1 mb-2'>
                <label htmlFor='email'>Email</label>
                <input
                  type='email'
                  id='email'
                  placeholder='email@email.cl'
                  className='w-full border-2 border-gray-400 rounded-lg py-2 px-4'
                  {...register('email', {
                    required: 'El email es obligatorio'
                  })}
                />
                {errors.email?.message && (
                  <div className='w-full h-8  py-1 rounded-full px-3 overflow-hidden bg-red-600'>
                    <p className='text-white'> {errors.email.message} </p>
                  </div>
                )}
              </div>

              <div className='w-full flex flex-col gap-1'>
                <label htmlFor='password'>Contraseña</label>
                <input
                  type='password'
                  id='password'
                  placeholder='********'
                  className='w-full border-2 border-gray-400 rounded-lg py-2 px-4'
                  {...register('password', {
                    required: 'La contraseña es obligatoria'
                  })}
                />
                {errors.password?.message && (
                  <div className='w-full h-8 py-1 rounded-full px-3 overflow-hidden bg-red-600'>
                    <p className='text-white'> {errors.password.message} </p>
                  </div>
                )}
              </div>

              <div className='w-full my-5'>
                <button
                  disabled={user.loading}
                  className={`w-full py-2 border border-blue-600 ${
                    user.loading
                      ? 'bg-transparent text-blue-600'
                      : 'bg-blue-600 text-white'
                  }   rounded-full`}
                >
                  {user.loading ? 'Cargando...' : 'Ingresar'}
                </button>
              </div>
            </form>
            <div className='w-full flex flex-row justify-center md:justify-end'>
              <Link
                href={`/auth/register?redirect=${(router.query
                  .redirect as string) || '/'}`}
                passHref
              >
                <a className='text-blue-600 border-b border-transparent hover:border-blue-600'>
                  ¿No tienes cuenta?
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </LoginLayout>
  )
}

export default LoginPage
