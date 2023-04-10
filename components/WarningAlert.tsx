import { Alert } from '@mui/material'
import AuthorizationButton from './AuthorizationButton'

const WarningAlert = () => {
  return (
    <Alert
      severity="warning"
      action={
        <AuthorizationButton href="/api/auth/login">Login</AuthorizationButton>
      }
    >
      You need to authorize first!
    </Alert>
  )
}

export default WarningAlert
