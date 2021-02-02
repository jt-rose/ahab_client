/*
import {
  Link as ChakraLink,
  Text,
  Code,
  List,
  ListIcon,
  ListItem,
} from '@chakra-ui/react'
import { CheckCircleIcon, LinkIcon } from '@chakra-ui/icons'
import { Hero } from '../components/Hero'
import { Container } from '../components/Container'
import { Main } from '../components/Main'
import { DarkModeSwitch } from '../components/DarkModeSwitch'
import { CTA } from '../components/CTA'
import { Footer } from '../components/Footer'
*/

import { Layout } from '../components/Layout'
import { withUrqlClient } from 'next-urql'
import { usePostsQuery } from '../generated/graphql'
import { createUrqlClient } from '../utils/createUrqlClient'
import NextLink from 'next/link'
import { Box, Button, Flex, Heading, Link, Stack, Text } from '@chakra-ui/react'
import React, { useState } from 'react'

const limitVariable = {
  variables: {
    limit: 10,
  },
}

interface CursorVariables {
  limit: number
  cursor: string | null
}

const Index = () => {
  const [variables, setVariables] = useState<CursorVariables>({
    limit: 10,
    cursor: null,
  })
  const [{ data, fetching }] = usePostsQuery({ variables })
  console.log(data)

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
              <Box key={post.id} p={5} shadow='md' borderWidth='1px'>
                <Heading fontSize='xl'>{post.title}</Heading>
                <Text mt={4}>{post.textSnippet}</Text>
              </Box>
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
