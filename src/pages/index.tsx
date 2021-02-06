import { Layout } from '../components/Layout'
import { withUrqlClient } from 'next-urql'
import {
  usePostsQuery,
  useDeletePostMutation,
  useFetchUserQuery,
} from '../generated/graphql'
import { createUrqlClient } from '../utils/createUrqlClient'
import NextLink from 'next/link'
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { UpdootSection } from '../components/UpdootSection'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'

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
  const [, deletePost] = useDeletePostMutation()
  const [{ data: fetchUserData }] = useFetchUserQuery()

  if (!data && !fetching) {
    return <div>Query failed</div>
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

      {!data && fetching ? (
        <div>loading...</div>
      ) : (
        <>
          <Stack spacing={8}>
            {data!.posts.posts.map((post, i) =>
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
                      {fetchUserData?.fetchUser?.id === post.creator.id && (
                        <Box ml='auto'>
                          <NextLink
                            href='post/edit/[id]'
                            as={`post/edit/${post.id}`}
                          >
                            <IconButton
                              mr={4}
                              icon={<EditIcon />}
                              aria-label='edit post'
                            />
                          </NextLink>
                          <IconButton
                            icon={<DeleteIcon />}
                            aria-label='delete post'
                            onClick={() => deletePost({ id: post.id })}
                          />
                        </Box>
                      )}
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
