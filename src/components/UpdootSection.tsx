import { Flex, IconButton } from '@chakra-ui/react'
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { PostSnippetFragment } from '../generated/graphql'
import { useVoteMutation } from '../generated/graphql'

interface UpdootSectionProps {
  post: PostSnippetFragment
}

export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
  const { points, id, voteStatus } = post
  const [, vote] = useVoteMutation() // update cache?
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
            postId: id,
            value: 1,
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
            postId: id,
            value: -1,
          })
        }}
      />
    </Flex>
  )
}
