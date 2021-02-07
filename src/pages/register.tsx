import React from 'react'
import { Form, Formik } from 'formik'
import { InputField } from '../components/InputField'
import { Box, Button } from '@chakra-ui/react'
import { useRegisterMutation } from '../generated/graphql'
import { toErrorMap } from '../utils/toErrorMap'
import { useRouter } from 'next/router'
import { Layout } from '../components/Layout'

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter()
  const [register] = useRegisterMutation()
  return (
    <Layout title='register' variant='small'>
      <Formik
        initialValues={{ username: '', password: '', email: '' }}
        onSubmit={async (values, { setErrors }) => {
          console.log(values)
          const res = await register({ variables: { ...values } })
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
    </Layout>
  )
}

export default Register
