import { Box, Flex, Link, Button } from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import router from 'next/dist/next-server/lib/router/router'
import React, { useState } from 'react'
import { InputField } from '../components/InputField'
import { Layout } from '../components/Layout'
import { Wrapper } from '../components/Wrapper'
import { toErrorMap } from '../utils/toErrorMap'
import login from './login'
import NextLink from 'next/link'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../utils/createUrqlClient'
import { useForgotPasswordMutation } from '../generated/graphql'

interface ForgotPasswordProps {}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({}) => {
  const [complete, setComplete] = useState(false)
  const [, forgotPassword] = useForgotPasswordMutation()
  return (
    <Layout title='login'>
      <Wrapper variant='small'>
        <Formik
          initialValues={{ email: '' }}
          onSubmit={async (values) => {
            await forgotPassword(values)
            setComplete(true)
          }}
        >
          {({ isSubmitting }) =>
            complete ? (
              <Box>A reset password link has been sent to you</Box>
            ) : (
              <Form>
                <InputField
                  name='email'
                  placeholder='email'
                  label='Email'
                  type='email'
                />

                <Button
                  mt={4}
                  colorScheme='teal'
                  type='submit'
                  isLoading={isSubmitting}
                >
                  Forgot Password
                </Button>
              </Form>
            )
          }
        </Formik>
      </Wrapper>
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient)(ForgotPassword)
