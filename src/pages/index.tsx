import { Layout } from '../components/Layout'
import { withUrqlClient } from 'next-urql'
import { usePostsQuery } from '../generated/graphql'
import { createUrqlClient } from '../utils/createUrqlClient'
import NextLink from 'next/link'
import { Box, Button, Flex, Heading, Link, Stack, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { UpdootSection } from '../components/UpdootSection'

interface CursorVariables {
  limit: number
  cursor: string | null
}

const Index = () => {
  const [variables, setVariables] = useState<CursorVariables>({
    limit: 10,
    cursor: null,
  })
  const [{ data, fetching }] = usePostsQuery({
    variables,
    //requestPolicy: 'cache-and-network',
    // cache issues, default to cache and network for now
  })

  if (!data && !fetching) {
    return <div>Query failed</div>
  }
  return (
    <Layout title='Home' variant='regular'>
      <Flex>
        <Heading>Ahab</Heading>
        <NextLink href='/create-post'>
          <Link ml='auto'>Create Post</Link>
        </NextLink>
      </Flex>
      <br />

      {!data && fetching ? (
        <div>loading...</div>
      ) : (
        <>
          <Stack spacing={8}>
            {data!.posts.posts.map((post, i) => (
              <Flex key={post.id} p={5} shadow='md' borderWidth='1px'>
                <UpdootSection post={post} />
                <Box>
                  <NextLink href='/post/[id]' as={'/post/' + post.id}>
                    <Link>
                      <Heading fontSize='xl'>{post.title}</Heading>
                    </Link>
                  </NextLink>

                  <Text>posted by {post.creator.username}</Text>
                  <Text mt={4}>{post.textSnippet}</Text>
                </Box>
              </Flex>
            ))}
          </Stack>
          <br />
        </>
      )}
      {data && data.posts.hasMore && (
        <Flex>
          <Button
            my={8}
            m='auto'
            onClick={() => {
              setVariables({
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              })
            }}
            isLoading={fetching}
          >
            load more
          </Button>
        </Flex>
      )}
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index)
