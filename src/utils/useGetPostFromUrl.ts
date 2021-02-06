import { useRouter } from 'next/router'
import { usePostQuery } from '../generated/graphql'

export const useGetPostFromUrl = () => {
  const router = useRouter()
  const { id } = router.query
  const formattedId = typeof id === 'string' ? parseInt(id) : -1
  return usePostQuery({
    pause: formattedId === -1,
    variables: { id: formattedId },
  })
}
