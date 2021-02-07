import { Box, Button } from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import React, { useState } from 'react'
import { InputField } from '../components/InputField'
import { Layout } from '../components/Layout'
import { useForgotPasswordMutation } from '../generated/graphql'

interface ForgotPasswordProps {}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({}) => {
  const [complete, setComplete] = useState(false)
  const [forgotPassword] = useForgotPasswordMutation()
  return (
    <Layout title='login' variant='small'>
      <Formik
        initialValues={{ email: '' }}
        onSubmit={async (values) => {
          await forgotPassword({ variables: { ...values } })
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
    </Layout>
  )
}

export default ForgotPassword
