import { ErrorMessage } from '@hookform/error-message'
import { FieldValues, FormState } from 'react-hook-form'
import styles from '../styles/error.module.scss'

const Error = ({
  formState,
  name,
}: {
  formState: FormState<FieldValues>
  name: string
}) => {
  return (
    <ErrorMessage
      errors={formState?.errors}
      as="p"
      name={name}
      render={({ message }) => <p className={styles.error}>{message}</p>}
    />
  )
}

export default Error
