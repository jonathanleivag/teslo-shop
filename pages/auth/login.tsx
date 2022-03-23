import { NextPage } from 'next'
import { LoginLayout } from '../../layouts'

const LoginPage: NextPage = () => {
  return (
    <LoginLayout title={'Ingresar'}>
      <div className='w-screen min-h-[calc(100vh-150px)] flex flex-row justify-center items-center'>
        <div className='w-[90%] md:w-[60%] xl:w-[40%] 2xl:w-[30%] overflow-hidden flex flex-col items-center'>
          <h1>
            <span className='prose prose-2xl font-bold'>Teslo |</span>
            <span className='prose prose-xl font-sans'> Shop</span>
          </h1>
          <div className='w-full mt-3'>
            <h2 className='text-lg'>Iniciar Sesión</h2>
          </div>
          <div className='w-full'>
            <form className='w-full mb-5'>
              <div className='w-full flex flex-col gap-1 mb-2'>
                <label htmlFor='email'>Email</label>
                <input
                  type='email'
                  name='email'
                  id='email'
                  placeholder='email@email.cl'
                  className='w-full border-2 border-gray-400 rounded-lg py-2 px-4'
                />
              </div>

              <div className='w-full flex flex-col gap-1'>
                <label htmlFor='password'>Contraseña</label>
                <input
                  type='password'
                  name='password'
                  id='password'
                  placeholder='********'
                  className='w-full border-2 border-gray-400 rounded-lg py-2 px-4'
                />
              </div>

              <div className='w-full my-5'>
                <button className='w-full py-2 border border-blue-600 bg-blue-600 text-white rounded-full'>
                  Ingresar
                </button>
              </div>
            </form>
            <div className='w-full flex flex-row justify-center md:justify-end'>
              <a className='text-blue-600 border-b border-transparent hover:border-blue-600'>
                ¿No tienes cuenta?
              </a>
            </div>
          </div>
        </div>
      </div>
    </LoginLayout>
  )
}

export default LoginPage
