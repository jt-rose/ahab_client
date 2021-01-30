import { Box, Button } from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import { withUrqlClient } from 'next-urql'
import React, { useEffect } from 'react'
import { InputField } from '../components/InputField'
import { Layout } from '../components/Layout'
import { createUrqlClient } from '../utils/createUrqlClient'
import { useCreatePostMutation } from '../generated/graphql'
import { useRouter } from 'next/router'
import { useIsAuth } from '../utils/useIsAuth'

// note: in real app, add loading spinner while fetching for ux
const CreatePost = () => {
  const router = useRouter()
  useIsAuth()
  const [, createPost] = useCreatePostMutation()
  return (
    <Layout title='login' variant='small'>
      <Formik
        initialValues={{ title: '', text: '' }}
        onSubmit={async (values, {}) => {
          const { error } = await createPost(values)
          if (!error) {
            router.push('/')
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name='title' placeholder='title' label='Title' />
            <Box mt={4}>
              <InputField
                name='text'
                placeholder='text...'
                label='Body'
                textarea
              />
            </Box>

            <Button
              mt={4}
              colorScheme='teal'
              type='submit'
              isLoading={isSubmitting}
            >
              Create Post
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient)(CreatePost)
