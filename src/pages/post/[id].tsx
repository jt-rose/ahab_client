import { withUrqlClient } from 'next-urql'
import { useRouter } from 'next/router'
import React from 'react'
import { createUrqlClient } from '../../utils/createUrqlClient'
import { usePostQuery } from '../../generated/graphql'
import { Layout } from '../../components/Layout'

const Post: React.FC = () => {
  const router = useRouter()
  const { id } = router.query
  const parsedId = typeof id === 'string' ? parseInt(id) : -1
  const [{ data, fetching }] = usePostQuery({
    pause: parsedId === -1,
    variables: {
      id: parsedId,
    },
  })

  if (fetching) {
    return (
      <Layout variant='regular'>
        <div>loading...</div>
      </Layout>
    )
  }
  return <Layout variant='regular'>{data?.post?.text}</Layout>
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Post)
