import { withUrqlClient } from 'next-urql'
import { useRouter } from 'next/router'
import React from 'react'
import { createUrqlClient } from '../../utils/createUrqlClient'
import { usePostQuery } from '../../generated/graphql'
import { Layout } from '../../components/Layout'
import { Heading } from '@chakra-ui/react'

const Post: React.FC = () => {
  const router = useRouter()
  const { id } = router.query
  const parsedId = typeof id === 'string' ? parseInt(id) : -1
  const [{ data, fetching, error }] = usePostQuery({
    pause: parsedId === -1,
    variables: {
      id: parsedId,
    },
  })

  if (error) {
    return <div>Error! {error.message}</div>
  }
  if (fetching) {
    return (
      <Layout variant='regular'>
        <div>loading...</div>
      </Layout>
    )
  }
  if (!data?.post) {
    return (
      <Layout variant='regular'>
        <div>No post found!</div>
      </Layout>
    )
  }
  return (
    <Layout variant='regular'>
      <Heading mb={4}>{data.post.title}</Heading>
      {data?.post?.text}
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Post)
