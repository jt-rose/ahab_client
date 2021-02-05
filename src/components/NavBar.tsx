import { Flex, Link, Box, Button, Heading } from '@chakra-ui/react'
import { withUrqlClient } from 'next-urql'
import NextLink from 'next/link'
import React from 'react'
import { useFetchUserQuery, useLogoutMutation } from '../generated/graphql'
import { createUrqlClient } from '../utils/createUrqlClient'
import { isServer } from '../utils/isServer'

interface NavBarProps {}

const SignInLinks = () => (
  <>
    <NextLink href='/login'>
      <Link mr={2}>login</Link>
    </NextLink>
    <NextLink href='/register'>
      <Link mr={2}>register</Link>
    </NextLink>
  </>
)

const NavBarUC: React.FC<NavBarProps> = ({}) => {
  const [
    { data, fetching },
  ] = useFetchUserQuery(/*{
    requestPolicy: 'cache-and-network',
    // cache issues, default to network and cache for now
  }*/)
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation()
  const username = data?.fetchUser?.username

  return (
    <Flex
      alignItems='center'
      position='sticky'
      top={0}
      zIndex={1}
      bg='tan'
      p={4}
    >
      <NextLink href='/'>
        <Link>
          <Heading>Ahab</Heading>
        </Link>
      </NextLink>
      <Box ml={'auto'}>
        {username ? (
          <Flex>
            <Box mr={2}>{username}</Box>
            <Button
              variant='link'
              onClick={() => logout()}
              isLoading={logoutFetching}
            >
              logout
            </Button>
          </Flex>
        ) : (
          <SignInLinks />
        )}
      </Box>
    </Flex>
  )
}

export const NavBar = withUrqlClient(createUrqlClient)(NavBarUC)
