import { Flex, IconButton } from '@chakra-ui/react'
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { PostSnippetFragment } from '../generated/graphql'

interface UpdootSectionProps {
  post: PostSnippetFragment
}

export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
  const { points } = post
  return (
    <Flex direction='column' justifyContent='center' alignItems='center' mr={8}>
      <IconButton
        aria-label='vote up'
        icon={<ChevronUpIcon />}
        size='24px'
        onClick={() => {}}
      />
      {points}
      <IconButton
        aria-label='vote down'
        icon={<ChevronDownIcon />}
        size='24px'
        onClick={() => {}}
      />
    </Flex>
  )
}
