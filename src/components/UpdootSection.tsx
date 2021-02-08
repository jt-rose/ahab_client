import { Flex, IconButton } from '@chakra-ui/react'
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { PostSnippetFragment, VoteMutation } from '../generated/graphql'
import { useVoteMutation } from '../generated/graphql'
import gql from 'graphql-tag'
import { ApolloCache } from '@apollo/client'
import { useGetFormattedPostId } from '../utils/useGetFormattedPostId'

interface UpdootSectionProps {
  post: PostSnippetFragment
}

const updateAfterVote = (
  value: number,
  postId: number,
  cache: ApolloCache<VoteMutation>
) => {
  const data = cache.readFragment<{
    id: string
    points: number
    voteStatus: number | null
  }>({
    id: 'Post:' + postId,
    fragment: gql`
      fragment __ on Post {
        id
        points
        voteStatus
      }
    `,
  })

  if (data) {
    if (data.voteStatus === value) return
    const newPoints =
      (data.points as number) + (!data.voteStatus ? 1 : 2) * value
    cache.writeFragment({
      id: 'Post:' + postId,
      data: { points: newPoints, voteStatus: value },
      fragment: gql`
        fragment __ on Post {
          points
          voteStatus
        }
      `,
    })
  }
}

export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
  const { points, id, voteStatus } = post
  const [vote] = useVoteMutation() // update cache?
  return (
    <Flex direction='column' justifyContent='center' alignItems='center' mr={8}>
      <IconButton
        aria-label='vote up'
        icon={<ChevronUpIcon />}
        colorScheme={voteStatus === 1 ? 'green' : undefined}
        size='24px'
        onClick={() => {
          if (voteStatus === 1) return
          vote({
            variables: {
              postId: id,
              value: 1,
            },
            update: (cache) => updateAfterVote(1, post.id, cache),
          })
        }}
      />
      {points}
      <IconButton
        aria-label='vote down'
        icon={<ChevronDownIcon />}
        size='24px'
        colorScheme={voteStatus === -1 ? 'red' : undefined}
        onClick={() => {
          if (voteStatus === -1) return
          vote({
            variables: {
              postId: id,
              value: -1,
            },
            update: (cache) => updateAfterVote(-1, post.id, cache),
          })
        }}
      />
    </Flex>
  )
}
