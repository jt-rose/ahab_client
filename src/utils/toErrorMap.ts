import { FieldError } from '../generated/graphql'

export const toErrorMap = (errors: FieldError[]): Record<string, string> =>
  errors.reduce((prev, curr) => ({ ...prev, [curr.field]: curr.message }), {})
