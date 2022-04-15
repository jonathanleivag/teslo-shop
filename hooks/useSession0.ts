import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { ILogin } from '../interfaces/loginInterface'
export const useSession0 = (): ILogin | null => {
  const { data } = useSession()
  const [session, setSession] = useState<ILogin | null>(data?.user as ILogin)

  useEffect(() => {
    setSession(data?.user as ILogin)
    return () => {}
  }, [data])

  return session
}
