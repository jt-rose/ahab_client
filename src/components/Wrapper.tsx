import { Box } from '@chakra-ui/react'

interface WrapperProps {
  variant: 'small' | 'regular'
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = 'regular',
}) => {
  return (
    <Box
      maxW={variant === 'regular' ? '800px' : '400px'}
      w='90%'
      mt={8}
      mx='auto'
      mb={8}
    >
      {children}
    </Box>
  )
}
