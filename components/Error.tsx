import { ErrorMessage } from '@hookform/error-message'
import { ErrorStyle } from '../styled-components/global.styled'

const Error = ({ formState, name }: { formState: any; name: string }) => {
  return (
    <ErrorMessage
      errors={formState?.errors}
      as="p"
      name={name}
      render={({ message }) => <ErrorStyle>{message}</ErrorStyle>}
    />
  )
}

export default Error
