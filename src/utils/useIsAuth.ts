import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useFetchUserQuery } from '../generated/graphql'

export const useIsAuth = () => {
  const { data, loading } = useFetchUserQuery()
  const router = useRouter()
  useEffect(() => {
    if (!loading && !data?.fetchUser) {
      router.replace('/login?next=' + router.pathname)
    }
  }, [loading, data, router])
}
