import React from 'react'
import { Form, Formik } from 'formik'
import { InputField } from '../components/InputField'
import { Box, Button, Flex, Link } from '@chakra-ui/react'
import {
  FetchUserDocument,
  FetchUserQuery,
  useLoginMutation,
} from '../generated/graphql'
import { toErrorMap } from '../utils/toErrorMap'
import { useRouter } from 'next/router'
import { Layout } from '../components/Layout'
import NextLink from 'next/link'
import { withApollo } from '../utils/withApollo'

interface registerProps {}

const Login: React.FC<registerProps> = ({}) => {
  const router = useRouter()
  const [login] = useLoginMutation()
  return (
    <Layout title='login' variant='small'>
      <Formik
        initialValues={{ usernameOrEmail: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login({
            variables: values,
            update: (cache, { data }) => {
              cache.writeQuery<FetchUserQuery>({
                query: FetchUserDocument,
                data: {
                  __typename: 'Query',
                  fetchUser: data?.login.user,
                },
              })
              cache.evict({ fieldName: 'posts:{}' })
            },
          })
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors))
          } else if (response.data?.login.user) {
            if (typeof router.query.next === 'string') {
              router.push(router.query.next)
            } else {
              // worked
              router.push('/')
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name='usernameOrEmail'
              placeholder='usernameOrEmail'
              label='Username / Email'
            />
            <Box mt={4}>
              <InputField
                name='password'
                placeholder='password'
                label='Password'
                type='password'
              />
            </Box>

            <Flex mt={2}>
              <NextLink href='/forgot-password'>
                <Link ml='auto'>forgot password?</Link>
              </NextLink>
            </Flex>

            <Button
              mt={4}
              colorScheme='teal'
              type='submit'
              isLoading={isSubmitting}
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  )
}

export default withApollo({ ssr: false })(Login)
