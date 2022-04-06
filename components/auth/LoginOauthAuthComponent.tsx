import { FC, Fragment } from 'react'
import { signIn } from 'next-auth/react'

export interface ILoginOauthAuthComponent {
  provider: any
}

export const LoginOauthAuthComponent: FC<ILoginOauthAuthComponent> = ({
  provider
}) => {
  return (
    <>
      <div className='border-b border-gray-600 w-full h-2' />
      <div className='w-full flex flex-row justify-center items-center py-5'>
        <div className='w-[60%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
          {Object.values(provider).map((provider: any) => (
            <Fragment key={provider.id}>
              {provider.id !== 'credentials' && (
                <button
                  onClick={() => signIn(provider.id)}
                  className='border border-gray-600 rounded-lg'
                >
                  {provider.name}
                </button>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </>
  )
}
