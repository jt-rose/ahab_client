import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { Box, IconButton } from '@chakra-ui/react'
import React from 'react'
import NextLink from 'next/link'
import { useDeletePostMutation, useFetchUserQuery } from '../generated/graphql'

export const EditDeletePostButtons = (props: {
  id: number
  creatorId: number
}) => {
  const { id, creatorId } = props
  const { data } = useFetchUserQuery()
  const [deletePost] = useDeletePostMutation()

  if (data?.fetchUser?.id !== creatorId) {
    return null
  } else {
    return (
      <Box>
        <NextLink href='post/edit/[id]' as={`post/edit/${id}`}>
          <IconButton mr={4} icon={<EditIcon />} aria-label='edit post' />
        </NextLink>
        <IconButton
          icon={<DeleteIcon />}
          aria-label='delete post'
          onClick={() => deletePost({ variables: { id } })}
        />
      </Box>
    )
  }
}
