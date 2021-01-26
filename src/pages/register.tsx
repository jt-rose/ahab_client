import React from 'react'
import { Form, Formik } from 'formik'
import { Wrapper } from '../components/Wrapper'
import { InputField } from '../components/InputField'
import { Box, Button } from '@chakra-ui/react'
import { useRegisterMutation } from '../generated/graphql'
import { toErrorMap } from '../utils/toErrorMap'
import { useRouter } from 'next/router'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../utils/createUrqlClient'
import { Layout } from '../components/Layout'

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter()
  const [loadStatus, register] = useRegisterMutation()
  return (
    <Layout title='register'>
      <Wrapper variant='small'>
        <Formik
          initialValues={{ username: '', password: '', email: '' }}
          onSubmit={async (values, { setErrors }) => {
            console.log(values)
            const res = await register({ ...values })
            const errors = res.data?.register.errors
            if (errors) {
              setErrors(toErrorMap(errors))
            } else if (res.data?.register.user) {
              router.push('/')
            } else {
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField
                name='username'
                placeholder='username'
                label='Username'
              />
              <Box mt={4}>
                <InputField
                  name='password'
                  placeholder='password'
                  label='Password'
                  type='password'
                />
              </Box>
              <Box mt={4}>
                <InputField name='email' placeholder='email' label='Email' />
              </Box>
              <Button
                mt={4}
                colorScheme='teal'
                type='submit'
                isLoading={isSubmitting}
              >
                Register
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient)(Register)
