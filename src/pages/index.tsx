import { Layout } from '../components/Layout'
import { usePostsQuery } from '../generated/graphql'
import NextLink from 'next/link'
import { Box, Button, Flex, Heading, Link, Stack, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { UpdootSection } from '../components/UpdootSection'
import { EditDeletePostButtons } from '../components/EditDeletePostButtons'

interface CursorVariables {
  limit: number
  cursor: string | null
}

const Index = () => {
  const [variables, setVariables] = useState<CursorVariables>({
    limit: 10,
    cursor: null,
  })
  const { data, error, loading } = usePostsQuery({
    variables,
    //requestPolicy: 'cache-and-network',
    // cache issues, default to cache and network for now
  })

  if (!data && !loading) {
    return <div>Query failed: {error?.message}</div>
  }
  return (
    <Layout title='Home' variant='regular'>
      <Flex>
        <Heading>Posts</Heading>
        <NextLink href='/create-post'>
          <Button as={Link} ml='auto'>
            Create Post
          </Button>
        </NextLink>
      </Flex>
      <br />

      {!data && loading ? (
        <div>loading...</div>
      ) : (
        <>
          <Stack spacing={8}>
            {data!.posts.posts.map((post) =>
              !post ? null : (
                <Flex key={post.id} p={5} shadow='md' borderWidth='1px'>
                  <UpdootSection post={post} />
                  <Box flex={1}>
                    <NextLink href='/post/[id]' as={'/post/' + post.id}>
                      <Link>
                        <Heading fontSize='xl'>{post.title}</Heading>
                      </Link>
                    </NextLink>

                    <Text>posted by {post.creator.username}</Text>
                    <Flex>
                      <Text flex={1} mt={4}>
                        {post.textSnippet}
                      </Text>

                      <EditDeletePostButtons
                        id={post.id}
                        creatorId={post.creator.id}
                      />
                    </Flex>
                  </Box>
                </Flex>
              )
            )}
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
            isLoading={loading}
          >
            load more
          </Button>
        </Flex>
      )}
    </Layout>
  )
}

export default Index
