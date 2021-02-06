import { withUrqlClient } from 'next-urql'
import React from 'react'
import { createUrqlClient } from '../../utils/createUrqlClient'
import { Layout } from '../../components/Layout'
import { Box, Heading } from '@chakra-ui/react'
import { useGetPostFromUrl } from '../../utils/useGetPostFromUrl'
import { EditDeletePostButtons } from '../../components/EditDeletePostButtons'

const Post: React.FC = () => {
  const [{ data, fetching, error }] = useGetPostFromUrl()

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
      <Box mb={4}>{data?.post?.text}</Box>

      <Box textAlign='right'>
        <EditDeletePostButtons
          id={data.post.id}
          creatorId={data.post.creator.id}
        />
      </Box>
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Post)
