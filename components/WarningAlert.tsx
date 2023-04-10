import { Alert } from '@mui/material'
import LoginButton from './AuthorizationButton'

const WarningAlert = () => {
  return (
    <Alert severity="warning" action={<LoginButton />}>
      You need to authorize first!
    </Alert>
  )
}

export default WarningAlert
