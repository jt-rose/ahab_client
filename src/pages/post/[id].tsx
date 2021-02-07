import React from 'react'
import { Layout } from '../../components/Layout'
import { Box, Heading } from '@chakra-ui/react'
import { useGetPostFromUrl } from '../../utils/useGetPostFromUrl'
import { EditDeletePostButtons } from '../../components/EditDeletePostButtons'
import { withApollo } from '../../utils/withApollo'

const Post: React.FC = () => {
  const { data, loading, error } = useGetPostFromUrl()

  if (error) {
    return <div>Error! {error.message}</div>
  }
  if (loading) {
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

export default withApollo({ ssr: true })(Post)
