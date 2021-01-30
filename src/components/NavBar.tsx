import { Flex, Link, Box, Button } from '@chakra-ui/react'
import NextLink from 'next/link'
import React from 'react'
import { useFetchUserQuery, useLogoutMutation } from '../generated/graphql'
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

const SignOut = (props: { username: string }) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation()
  const [{ data, fetching }] = useFetchUserQuery({
    pause: isServer(),
  })

  return (
    <Flex>
      <Box mr={2}>{props.username}</Box>
      <Button
        variant='link'
        onClick={() => logout()}
        isLoading={logoutFetching}
      >
        logout
      </Button>
    </Flex>
  )
}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data, fetching }] = useFetchUserQuery()
  const username = data?.fetchUser?.username

  return (
    <Flex position='sticky' top={0} zIndex={1} bg='tan' p={4}>
      <Box ml={'auto'}>
        {username ? <SignOut username={username} /> : <SignInLinks />}
      </Box>
    </Flex>
  )
}
