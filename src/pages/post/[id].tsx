import { withUrqlClient } from 'next-urql'
import React from 'react'
import { createUrqlClient } from '../../utils/createUrqlClient'
import { Layout } from '../../components/Layout'
import { Heading } from '@chakra-ui/react'
import { useGetPostFromUrl } from '../../utils/useGetPostFromUrl'

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
      {data?.post?.text}
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Post)
