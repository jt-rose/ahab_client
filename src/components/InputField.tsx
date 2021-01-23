import React from 'react'
import { useField } from 'formik'
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react'

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string
  label: string
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  size: _,
  ...props
}) => {
  const { placeholder } = props
  const [field, { error }] = useField(props)
  const hasError = error ? true : false

  return (
    <FormControl isInvalid={hasError}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Input {...props} {...field} id={field.name} placeholder={placeholder} />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  )
}
