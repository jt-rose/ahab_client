import React from 'react'
import { useField } from 'formik'
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from '@chakra-ui/react'

type InputFieldProps = React.InputHTMLAttributes<
  HTMLInputElement | HTMLTextAreaElement
> & {
  name: string
  label: string
  textarea?: boolean
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  textarea,
  size: _,
  ...props
}) => {
  const { placeholder } = props
  const [field, { error }] = useField(props)
  const hasError = error ? true : false
  return (
    <FormControl isInvalid={hasError}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      {textarea === true ? (
        <Textarea
          {...props}
          {...field}
          id={field.name}
          placeholder={placeholder}
        />
      ) : (
        <Input
          {...props}
          {...field}
          id={field.name}
          placeholder={placeholder}
        />
      )}
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  )
}
