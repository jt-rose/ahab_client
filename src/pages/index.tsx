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
import { Link } from '@chakra-ui/react'

const limitVariable = {
  variables: {
    limit: 10,
  },
}

const Index = () => {
  const [{ data }] = usePostsQuery(limitVariable)
  return (
    <Layout title='Home' variant='regular'>
      <NextLink href='/create-post'>
        <Link>Create Post</Link>
      </NextLink>
      <br />
      <div>
        <h2>Hello world!</h2>
        <br />
        <ul>
          {data?.posts.map((p, i) => (
            <li key={p.title + '-' + i}>{p.title}</li>
          ))}
        </ul>
      </div>
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index)
