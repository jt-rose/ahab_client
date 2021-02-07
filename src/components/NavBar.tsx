import { Flex, Link, Box, Button, Heading } from '@chakra-ui/react'
import NextLink from 'next/link'
import React from 'react'
import { useFetchUserQuery, useLogoutMutation } from '../generated/graphql'
import { isServer } from '../utils/isServer'
import { useRouter } from 'next/router'

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

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const router = useRouter()
  const { data } = useFetchUserQuery()
  //{skip: isServer()}
  const [logout, { loading }] = useLogoutMutation()
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
              onClick={async () => {
                await logout()
                router.reload()
              }}
              isLoading={loading}
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
