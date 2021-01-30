import { Box, Button, Flex, Link } from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { InputField } from '../../components/InputField'
import { Layout } from '../../components/Layout'
import { useChangePasswordMutation } from '../../generated/graphql'
import { createUrqlClient } from '../../utils/createUrqlClient'
import { toErrorMap } from '../../utils/toErrorMap'
import NextLink from 'next/link'

interface PropsWthToken {
  token?: string
}

const ChangePassword: NextPage<PropsWthToken> = ({ token }) => {
  if (!token)
    return (
      <div>
        Uh-oh! It looks like you may have followed a bad link. Please resend the
        email to reset your password and use the link sent to you.
      </div>
    )
  const router = useRouter()
  const [, changePassword] = useChangePasswordMutation()
  const [tokenError, setTokenError] = useState('')
  return (
    <Layout title='change-password' variant='small'>
      <Formik
        initialValues={{ newPassword: '' }}
        onSubmit={async (values, { setErrors }) => {
          const { newPassword } = values
          const res = await changePassword({ token, newPassword })
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

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  }
}

export default withUrqlClient(createUrqlClient)(ChangePassword)
