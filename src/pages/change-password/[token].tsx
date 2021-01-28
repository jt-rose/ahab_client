import { Box, Button } from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { InputField } from '../../components/InputField'
import { Layout } from '../../components/Layout'
import { Wrapper } from '../../components/Wrapper'
import { useLoginMutation } from '../../generated/graphql'
import { toErrorMap } from '../../utils/toErrorMap'

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  const router = useRouter()
  const [loadStatus, login] = useLoginMutation()
  return (
    <Layout title='login'>
      <Wrapper variant='small'>
        <Formik
          initialValues={{ newPassword: '' }}
          onSubmit={async (values, { setErrors }) => {
            /* console.log(values)
            const res = await login(values)
            const errors = res.data?.login.errors
            if (errors) {
              setErrors(toErrorMap(errors))
            } else if (res.data?.login.user) {
              router.push('/')
            } else {
            }*/
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
      </Wrapper>
    </Layout>
  )
}

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  }
}

export default ChangePassword
