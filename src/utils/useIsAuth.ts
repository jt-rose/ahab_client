import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useFetchUserQuery } from '../generated/graphql'

export const useIsAuth = () => {
  const [{ data, fetching }] = useFetchUserQuery()
  const router = useRouter()
  useEffect(() => {
    if (!fetching && !data?.fetchUser) {
      router.replace('/login?next=' + router.pathname)
    }
  }, [fetching, data, router])
}
