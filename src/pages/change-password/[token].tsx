import { Box, Button, Flex, Link } from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { InputField } from '../../components/InputField'
import { Layout } from '../../components/Layout'
import {
  FetchUserDocument,
  FetchUserQuery,
  useChangePasswordMutation,
} from '../../generated/graphql'
import { toErrorMap } from '../../utils/toErrorMap'
import NextLink from 'next/link'
import { withApollo } from '../../utils/withApollo'

const ChangePassword = () => {
  const router = useRouter()
  const [changePassword] = useChangePasswordMutation()
  const [tokenError, setTokenError] = useState('')
  return (
    <Layout title='change-password' variant='small'>
      <Formik
        initialValues={{ newPassword: '' }}
        onSubmit={async (values, { setErrors }) => {
          const { newPassword } = values
          const token =
            typeof router.query.token === 'string' ? router.query.token : ''
          const res = await changePassword({
            variables: { token, newPassword },
            update: (cache, { data }) => {
              cache.writeQuery<FetchUserQuery>({
                query: FetchUserDocument,
                data: {
                  __typename: 'Query',
                  fetchUser: data?.changePassword.user,
                },
              })
            },
          })
          const errors = res.data?.changePassword.errors
          if (errors) {
            const errorMap = toErrorMap(errors)
            if ('token' in errorMap) {
              setTokenError(errorMap.token)
            }
            setErrors(errorMap)
          } else if (res.data?.changePassword.user) {
            router.push('/')
          } else {
            console.error('error') // handle with redirect
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box mt={4}>
              <InputField
                name='newPassword'
                placeholder='new password'
                label=' New Password'
                type='password'
              />
            </Box>
            {tokenError && (
              <Flex>
                <Box mr={2} style={{ color: 'red' }}>
                  {tokenError}
                </Box>
                <NextLink href='/forgot-password'>
                  <Link>forgot password</Link>
                </NextLink>
              </Flex>
            )}
            <Button
              mt={4}
              colorScheme='teal'
              type='submit'
              isLoading={isSubmitting}
            >
              Change Password
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  )
}

export default withApollo({ ssr: false })(ChangePassword)
