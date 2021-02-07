import { Box, Button } from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import React from 'react'
import { InputField } from '../components/InputField'
import { Layout } from '../components/Layout'
import { useCreatePostMutation } from '../generated/graphql'
import { useRouter } from 'next/router'
import { useIsAuth } from '../utils/useIsAuth'

// note: in real app, add loading spinner while fetching for ux
const CreatePost = () => {
  const router = useRouter()
  useIsAuth()
  const [createPost] = useCreatePostMutation()
  return (
    <Layout title='create post' variant='small'>
      <Formik
        initialValues={{ title: '', text: '' }}
        onSubmit={async (values, {}) => {
          const { errors } = await createPost({ variables: { ...values } })
          if (!errors) {
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

export default CreatePost
