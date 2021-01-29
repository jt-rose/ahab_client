import React from 'react'
import { Form, Formik } from 'formik'
import { Wrapper } from '../components/Wrapper'
import { InputField } from '../components/InputField'
import { Box, Button, Flex, Link } from '@chakra-ui/react'
import { useLoginMutation } from '../generated/graphql'
import { toErrorMap } from '../utils/toErrorMap'
import { useRouter } from 'next/router'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../utils/createUrqlClient'
import { Layout } from '../components/Layout'
import NextLink from 'next/link'

interface registerProps {}

const Login: React.FC<registerProps> = ({}) => {
  const router = useRouter()
  const [loadStatus, login] = useLoginMutation()
  return (
    <Layout title='login'>
      <Wrapper variant='small'>
        <Formik
          initialValues={{ usernameOrEmail: '', password: '' }}
          onSubmit={async (values, { setErrors }) => {
            console.log(values)
            const res = await login(values)
            const errors = res.data?.login.errors
            if (errors) {
              setErrors(toErrorMap(errors))
            } else if (res.data?.login.user) {
              router.push('/')
            } else {
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
      </Wrapper>
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient)(Login)
