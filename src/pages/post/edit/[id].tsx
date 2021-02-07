import { Box, Button } from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import { useRouter } from 'next/router'
import { InputField } from '../../../components/InputField'
import { Layout } from '../../../components/Layout'
import { usePostQuery, useUpdatePostMutation } from '../../../generated/graphql'
import { useGetFormattedPostId } from '../../../utils/useGetFormattedPostId'
import { useIsAuth } from '../../../utils/useIsAuth'

const EditPost = () => {
  useIsAuth()
  const router = useRouter()
  const [updatePost] = useUpdatePostMutation()
  const formattedId = useGetFormattedPostId()
  const { data, loading } = usePostQuery({
    skip: formattedId === -1,
    variables: {
      id: formattedId,
    },
  })
  if (loading) {
    return (
      <Layout variant='regular'>
        <div>...loading</div>
      </Layout>
    )
  }

  if (!data?.post) {
    return (
      <Layout variant='regular'>
        <div>could not find post</div>
      </Layout>
    )
  }

  const { id, title, text } = data.post
  return (
    <Layout title='edit post' variant='small'>
      <Formik
        initialValues={{ title, text }}
        onSubmit={async (values, {}) => {
          const { errors } = await updatePost({
            variables: { id: formattedId, ...values },
          })
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
              Update Post
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  )
}

export default EditPost
