import { useRouter } from 'next/router'

export const useGetFormattedPostId = () => {
  const router = useRouter()
  const { id } = router.query
  const formattedId = typeof id === 'string' ? parseInt(id) : -1
  return formattedId
}
